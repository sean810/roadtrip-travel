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
    axios.post("http://127.0.0.1:5000/bookings/", formData)
      .then(() => {
        fetchBookings();  // Refresh the list
        setFormData({ user_id: "", trip_id: "", guests: "" });
      })
      .catch((error) => console.error("Error adding booking:", error));
  };

  const handleUpdate = (id, newGuests) => {
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
    <div>
      <h1>Your Bookings</h1>

      {/* Booking Form */}
      <form onSubmit={handleSubmit}>
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
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Trip ID: {booking.trip_id} | Guests: {booking.guests} 
            <input
              type="number"
              placeholder="Update Guests"
              onChange={(e) => handleUpdate(booking.id, e.target.value)}
            />
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Link to="/">Go Back</Link>
    </div>
  );
}

export default Bookings;
