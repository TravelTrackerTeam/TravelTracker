import os
import requests
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)
from dotenv import load_dotenv
from flask_cors import CORS
from bson import ObjectId


load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET_KEY", "super-secret-key")

mongo = PyMongo(app)
jwt = JWTManager(app)

@app.route("/")
def home():
    return "Flask server is running!", 200

@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({"msg": "we're connected!!!!"}), 200

@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
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

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify({"msg": "Email and password required"}), 400

    user = mongo.db.users.find_one({"email": email})
    if user and check_password_hash(user["password"], password):
        access_token = create_access_token(identity=str(user["_id"]))
        return jsonify({"access_token": access_token}), 200
    else:
        return jsonify({"msg": "Invalid credentials"}), 401

@app.route("/api/trips", methods=["POST"])
@jwt_required()
def create_trip():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    trip = {
        "user_id": user_id,
        "tripName": data.get("tripName"),
        "budget": data.get("budget"),
        "currency": data.get("currency", "USD"),
        "flight": data.get("flight", []),
        "stay": data.get("stay", []),
        "expenses": data.get("expenses", []),
        "itinerary": data.get("itinerary", []),
        "notes": data.get("notes", "")
    }
    
    result = mongo.db.trips.insert_one(trip)
    return jsonify({"msg": "Trip created successfully", "trip_id": str(result.inserted_id)}), 201

@app.route("/api/trips", methods=["GET"])
@jwt_required()
def get_trips():
    user_id = get_jwt_identity()
    trips = list(mongo.db.trips.find({"user_id": user_id}))
    
    for trip in trips:
        trip["_id"] = str(trip["_id"])
        for field in ["expenses", "flight", "stay"]:
            for item in trip.get(field, []):
                if isinstance(item, dict) and "_id" in item:
                    item["_id"] = str(item["_id"])
    return jsonify(trips), 200

@app.route("/api/exchange-rate", methods=["GET"])
def exchange_rate():
    base = request.args.get("base")
    if not base:
        return jsonify({"msg": "Base currency required"}), 400

    api_key = os.environ.get("EXCHANGE_RATE_API_KEY")
    if not api_key:
        return jsonify({"msg": "Exchange Rate API key not configured"}), 500

    url = f"https://v6.exchangerate-api.com/v6/{api_key}/latest/{base}"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"msg": "Error fetching exchange rate"}), response.status_code

    data = response.json()
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
