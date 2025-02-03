from flask import Blueprint, jsonify, request
from models import db, Booking

booking_routes = Blueprint('booking_routes', __name__)

# GET all bookings
@booking_routes.route('/', methods=['GET'])
def get_bookings():
    bookings = Booking.query.all()
    return jsonify([
        {"id": b.id, "user_id": b.user_id, "trip_id": b.trip_id, "guests": b.guests} for b in bookings
    ])

# POST (Create) a new booking
@booking_routes.route('/', methods=['POST'])
def create_booking():
    data = request.get_json()  # Ensure JSON data is received correctly
    
    # Validate required fields
    if not data or "user_id" not in data or "trip_id" not in data or "guests" not in data:
        return jsonify({"error": "Missing required fields"}), 400
    
    new_booking = Booking(
        user_id=data["user_id"],
        trip_id=data["trip_id"],
        guests=data["guests"]
    )
    
    db.session.add(new_booking)
    db.session.commit()

    return jsonify({
        "message": "Booking created!",
        "booking": {
            "id": new_booking.id,
            "user_id": new_booking.user_id,
            "trip_id": new_booking.trip_id,
            "guests": new_booking.guests
        }
    }), 201

# PUT (Update) an existing booking
@booking_routes.route('/<int:booking_id>', methods=['PUT'])
def update_booking(booking_id):
    booking = Booking.query.get(booking_id)
    
    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    data = request.get_json()
    
    if "guests" in data:  # Ensure guests is being updated
        booking.guests = data["guests"]
        db.session.commit()  # Commit changes to DB

    return jsonify({
        "message": "Booking updated successfully",
        "booking": {
            "id": booking.id, 
            "user_id": booking.user_id, 
            "trip_id": booking.trip_id, 
            "guests": booking.guests
        }
    })

# DELETE a booking
@booking_routes.route('/<int:booking_id>', methods=['DELETE'])
def delete_booking(booking_id):
    booking = Booking.query.get(booking_id)
    
    if not booking:
        return jsonify({"error": "Booking not found"}), 404

    db.session.delete(booking)
    db.session.commit()
    
    return jsonify({"message": "Booking deleted successfully"}), 200
