from flask import Blueprint, jsonify
from models import Booking

booking_routes = Blueprint('booking_routes', __name__)

@booking_routes.route('/', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([{"id": b.id, "user_id": b.user_id, "trip_id": b.trip_id, "guests": b.guests} for b in bookings])
