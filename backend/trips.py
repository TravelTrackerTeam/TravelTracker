
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from models import TripModel

trip_bp = Blueprint("trips", __name__)

@trip_bp.route("/trips", methods=["GET"])
@jwt_required()
def get_trips():
    user_id = ObjectId(get_jwt_identity())
    return jsonify(TripModel.get_trips(user_id)), 200

@trip_bp.route("/trips", methods=["POST"])
@jwt_required()
def add_trip():
    data = request.get_json()
    user_id = ObjectId(get_jwt_identity())
    TripModel.add_trip(user_id, data)
    return "", 201

@trip_bp.route("/trips/<string:trip_id>", methods=["DELETE"])
@jwt_required()
def delete_trip(trip_id):
    user_id = ObjectId(get_jwt_identity())
    TripModel.delete_trip(user_id, trip_id)
    return "", 200


@trip_bp.route("/trips/<string:trip_id>/expenses", methods=["POST"])
@jwt_required()
def add_expense(trip_id):
    data = request.get_json()
    user_id = ObjectId(get_jwt_identity())
    updated = TripModel.add_expense(user_id, trip_id, data)
    return jsonify(updated), 200

@trip_bp.route("/trips/<string:trip_id>/expenses/<string:expense_id>", methods=["DELETE"])
@jwt_required()
def delete_expense(trip_id, expense_id):
    user_id = ObjectId(get_jwt_identity())
    updated = TripModel.delete_expense(user_id, trip_id, expense_id)
    return jsonify(updated), 200

















