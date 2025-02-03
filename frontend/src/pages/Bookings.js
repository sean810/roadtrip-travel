import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    trip_id: "",
    guests: ""
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    axios.get("http://127.0.0.1:5000/bookings/")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent empty submission
    if (!formData.user_id || !formData.trip_id || !formData.guests) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post("http://127.0.0.1:5000/api/bookings/", bookingData)
    .then(response => {
      console.log("Booking added:", response.data);
    })
    .catch(error => {
      console.error("Error adding booking:", error.response ? error.response.data : error.message);
    });
  }

  const handleUpdate = (id, newGuests) => {
    if (!newGuests) return; // Prevent empty updates
    axios.put(`http://127.0.0.1:5000/bookings/${id}`, { guests: newGuests })
      .then(() => fetchBookings()) // Refresh the list
      .catch((error) => console.error("Error updating booking:", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5000/bookings/${id}`)
      .then(() => fetchBookings()) // Refresh the list
      .catch((error) => console.error("Error deleting booking:", error));
  };

  return (
    <div className="bookings-container">
      <h1>Your Bookings</h1>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="booking-form">
        <input
          type="number"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="trip_id"
          placeholder="Trip ID"
          value={formData.trip_id}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="guests"
          placeholder="Guests"
          value={formData.guests}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Booking</button>
      </form>

      {/* Booking List */}
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-item">
            <p>Trip ID: {booking.trip_id} | Guests: {booking.guests}</p>
            <input
              type="number"
              placeholder="Update Guests"
              onBlur={(e) => handleUpdate(booking.id, e.target.value)}
            />
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Link to="/" className="back-button">Go Back</Link>
    </div>
  );
}

export default Bookings;
