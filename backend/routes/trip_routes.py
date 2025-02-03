from flask import Blueprint, jsonify
from models import Trip

trip_routes = Blueprint('trip_routes', __name__)

@trip_routes.route('/', methods=['GET'])
def get_trips():
    trips = Trip.query.all()
    return jsonify([{"id": t.id, "destination": t.destination, "price": t.price} for t in trips])
