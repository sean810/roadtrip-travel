import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/bookings/")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div>
      <h1>Your Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            Trip ID: {booking.trip_id} | Guests: {booking.guests}
          </li>
        ))}
      </ul>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default Bookings;
