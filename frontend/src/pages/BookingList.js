import React, { useEffect, useState } from "react";
import axios from "axios";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [updatedGuests, setUpdatedGuests] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://127.0.0.1:5000/api/bookings/")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const handleGuestChange = (id, value) => {
    setUpdatedGuests({ ...updatedGuests, [id]: value });
  };

  const handleUpdate = (id) => {
    const newGuests = updatedGuests[id];
    if (!newGuests) {
      alert("Please enter the number of guests.");
      return;
    }

    axios.put(`http://127.0.0.1:5000/api/bookings/${id}`, { guests: newGuests })
      .then(() => fetchBookings())
      .catch((error) => console.error("Error updating booking:", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/api/bookings/${id}`)
      .then(() => fetchBookings())
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <div className="bookings-container">
      <h1>Your Bookings</h1>

      {/* Booking List */}
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            <p>Trip ID: {booking.trip_id} | Guests: {booking.guests}</p>
            <input
              type="number"
              placeholder="Update Guests"
              value={updatedGuests[booking.id] || ""}
              onChange={(e) => handleGuestChange(booking.id, e.target.value)}
            />
            <button onClick={() => handleUpdate(booking.id)}>Update</button>
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
