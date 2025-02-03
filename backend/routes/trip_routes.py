from flask import Blueprint, jsonify
from models import Trip

trip_routes = Blueprint('trip_routes', __name__)

@trip_routes.route('/', methods=['GET'])
def get_trips():
    trips = Trip.query.all()
    return jsonify([{"id": t.id, "destination": t.destination, "price": t.price} for t in trips])

@trip_routes.route('/', methods=['POST'])
def create_trip():
    data = request.get_json()

    if not data.get('destination') or not data.get('price') or not data.get('date'):
        return jsonify({"error": "Missing required fields"}), 400

    new_trip = Trip(destination=data['destination'], price=data['price'], date=data['date'])
    db.session.add(new_trip)
    db.session.commit()

    return jsonify(new_trip.to_dict()), 201
