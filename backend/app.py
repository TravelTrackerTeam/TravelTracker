import os
import requests
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from bson.objectid import ObjectId
from dotenv import load_dotenv
from flask_cors import CORS

# load env\
load_dotenv()

app = Flask(__name__)
# enable CORS for your Vite origin, allow Authorization header & preflight
CORS(
    app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# mongo and jwt database
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")

# init extension
mongo = PyMongo(app)
jwt = JWTManager(app)

# home route test
@app.route("/")
def home():
    return "Flask server is running!", 200

# test connection
@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({"msg": "we're connected!!!!"}), 200

# User Endpoints
@app.route("/api/signup", methods=["POST", "OPTIONS"])
def signup():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400
    if mongo.db.users.find_one({"email": email}):
        return jsonify({"msg": "User already exists"}), 409
    hashed_password = generate_password_hash(password)
    user = {"email": email, "password": hashed_password}
    mongo.db.users.insert_one(user)
    return jsonify({"msg": "User created successfully"}), 201

@app.route("/api/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    data = request.get_json() or {}
    email = data.get("email")
    password = data.get("password")
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400
    user = mongo.db.users.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({"access_token": access_token}), 200
    return jsonify({"msg": "Invalid credentials"}), 401

@app.route("/api/user", methods=["PUT", "OPTIONS"])
@jwt_required()
def update_user():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    updates = {}
    if "username" in data:
        updates["username"] = data["username"]
    if "email" in data:
        updates["email"] = data["email"]
    if "password" in data and data["password"]:
        updates["password"] = generate_password_hash(data["password"])
    if not updates:
        return jsonify({"msg": "No fields to update"}), 400
    mongo.db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": updates}
    )
    return jsonify({"msg": "User updated"}), 200

@app.route("/api/user", methods=["DELETE", "OPTIONS"])
@jwt_required()
def delete_user():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    user_id = get_jwt_identity()
    mongo.db.users.delete_one({"_id": ObjectId(user_id)})
    return jsonify({"msg": "Account deleted"}), 200

# Trip Endpoints
@app.route("/api/trips", methods=["POST", "OPTIONS"])
@jwt_required()
def create_trip():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    user_id = get_jwt_identity()
    data = request.get_json() or {}
    trip = {
        "user_id": user_id,
        "tripName": data.get("tripName"),
        "budget": data.get("budget"),
        "expenses": data.get("expenses", []),
        "itinerary": data.get("itinerary", []),
        "notes": data.get("notes", "")
    }
    result = mongo.db.trips.insert_one(trip)
    return jsonify({"msg": "Trip created successfully", "trip_id": str(result.inserted_id)}), 201

@app.route("/api/trips", methods=["GET", "OPTIONS"])
@jwt_required()
def get_trips():
    
    user_id = get_jwt_identity()
    trips = list(mongo.db.trips.find({"user_id": user_id}))
    
    for trip in trips:
       # stringify the trip's own ID
       trip["_id"] = str(trip["_id"])
       # now stringify each nested expense ID
       for exp in trip.get("expenses", []):
           exp["_id"] = str(exp["_id"])
    return jsonify(trips), 200

@app.route("/api/trips/<trip_id>", methods=["DELETE", "OPTIONS"])
@jwt_required()
def delete_trip(trip_id):
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    user_id = get_jwt_identity()
    result = mongo.db.trips.delete_one({
        "_id": ObjectId(trip_id),
        "user_id": user_id
    })
    if result.deleted_count == 0:
        return jsonify({"msg": "Trip not found or not yours"}), 404
    return jsonify({"msg": "Trip deleted"}), 200

@app.route("/api/trips/<trip_id>/expenses", methods=["POST", "OPTIONS"])
@jwt_required()
def add_expense(trip_id):
     if request.method == 'OPTIONS':
         return jsonify({}), 200

     try:
         user_id = get_jwt_identity()
         # validate trip_id
         trip_obj_id = ObjectId(trip_id)
         
         data = request.get_json(force=True)
         desc = data.get("description")
         amount = data.get("amount")
         if not desc or amount is None:
             return jsonify({"msg": "Description and amount required"}), 400

         # ensure amount is a number
         amount = float(amount)

         expense = {"_id": ObjectId(), "description": desc, "amount": amount}
         result = mongo.db.trips.update_one(
             {"_id": trip_obj_id, "user_id": user_id},
             {"$push": {"expenses": expense}}
         )
         if result.matched_count == 0:
             return jsonify({"msg": "Trip not found or not yours"}), 404

         expense["_id"] = str(expense["_id"])
         return jsonify({"msg": "Expense added", "expense": expense}), 201

     except Exception as e:
         # log full traceback to console
         app.logger.exception("🔥 add_expense failed")
         # return the real error message in JSON
         return jsonify({
             "msg": "Internal server error",
             "error": str(e)
         }), 500

@app.route("/api/trips/<trip_id>/expenses/<expense_id>", methods=["DELETE", "OPTIONS"])
@jwt_required()
def delete_expense(trip_id, expense_id):
    if request.method == "OPTIONS":
        return jsonify({}), 200
    user_id = get_jwt_identity()
    result = mongo.db.trips.update_one(
        {
            "_id": ObjectId(trip_id),
            "user_id": user_id
        },
        {
            # pull the matching expense out of the array
            "$pull": {"expenses": {"_id": ObjectId(expense_id)}}
        }
    )
    if result.matched_count == 0:
        return jsonify(msg="Trip not found or not yours"), 404
    return jsonify(msg="Expense deleted"), 200

# Currency Conversion
@app.route("/api/exchange-rate", methods=["GET", "OPTIONS"])
def exchange_rate():
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    base = request.args.get("base")
    target = request.args.get("target")
    if not base or not target:
        return jsonify({"msg": "Base and target currency required"}), 400
    api_key = os.environ.get("EXCHANGE_RATE_API_KEY")
    if not api_key:
        return jsonify({"msg": "Exchange Rate API key not configured"}), 500
    url = f"https://v6.exchangerate-api.com/v6/{api_key}/pair/{base}/{target}"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"msg": "Error fetching exchange rate"}), response.status_code
    data = response.json()
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
