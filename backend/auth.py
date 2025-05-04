
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import UserModel

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    if UserModel.find_by_email(data["email"]):
        return jsonify(error="Email already registered"), 400

    result = UserModel.create_user(
        data["username"], data["email"], data["password"]
    )
    token = create_access_token(identity=str(result.inserted_id))
    return jsonify(token=token), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = UserModel.find_by_email(data["email"])
    if not user or not UserModel.verify_password(user, data["password"]):
        return jsonify(error="Invalid credentials"), 401

    token = create_access_token(identity=str(user["_id"]))
    return jsonify(token=token), 200

















