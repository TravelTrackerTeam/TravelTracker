
from bson import ObjectId
from extensions import mongo, bcrypt

class UserModel:
    @staticmethod
    def find_by_email(email):
        """Return the user document (or None) for the given email."""
        return mongo.db.users.find_one({"email": email})

    @staticmethod
    def create_user(username, email, password):
        """Hash & insert a new user, return the InsertOneResult."""
        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        return mongo.db.users.insert_one({
            "username": username,
            "email": email,
            "password": hashed_pw
        })

    @staticmethod
    def verify_password(user_doc, password):
        """Check given password against stored hash."""
        return bcrypt.check_password_hash(user_doc["password"], password)


class TripModel:
    @staticmethod
    def _serialize(doc):
        return {
            "_id": str(doc["_id"]),
            "title": doc["title"],
            "budget": doc["budget"],
            "currency": doc.get("currency", "USD"),
            "expenses": [
                {
                    "_id": str(e["_id"]),
                    "name": e["name"],
                    "amount": e["amount"],
                    "currency": e.get("currency", "USD")
                }
                for e in doc.get("expenses", [])
            ],
        }

    @classmethod
    def get_trips(cls, user_id):
        """Return list of trips for this user."""
        docs = mongo.db.trips.find({"user_id": user_id})
        return [cls._serialize(d) for d in docs]

    @classmethod
    def add_trip(cls, user_id, data):
        """Insert a new trip for this user."""
        mongo.db.trips.insert_one({
            "user_id": user_id,
            "title": data["title"],
            "budget": data["budget"],
            "currency": data.get("currency", "USD"),
            "expenses": []
        })

    @classmethod
    def delete_trip(cls, user_id, trip_id):
        """Delete a trip by its ObjectId and user_id."""
        mongo.db.trips.delete_one({
            "_id": ObjectId(trip_id),
            "user_id": user_id
        })

    @classmethod
    def add_expense(cls, user_id, trip_id, data):
        """Push a new expense into a trip’s expenses array."""
        exp = {
            "_id": ObjectId(),
            "name": data["name"],
            "amount": data["amount"],
            "currency": data.get("currency", "USD")
        }
        mongo.db.trips.update_one(
            {"_id": ObjectId(trip_id), "user_id": user_id},
            {"$push": {"expenses": exp}}
        )
        # return updated trip
        doc = mongo.db.trips.find_one({"_id": ObjectId(trip_id), "user_id": user_id})
        return cls._serialize(doc)

    @classmethod
    def delete_expense(cls, user_id, trip_id, expense_id):
        """Pull an expense out by its _id."""
        mongo.db.trips.update_one(
            {"_id": ObjectId(trip_id), "user_id": user_id},
            {"$pull": {"expenses": {"_id": ObjectId(expense_id)}}}
        )
        doc = mongo.db.trips.find_one({"_id": ObjectId(trip_id), "user_id": user_id})
        return cls._serialize(doc)













