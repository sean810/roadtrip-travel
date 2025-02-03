import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/trips/")
      .then((response) => setTrips(response.data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  return (
    <div>
      <h1>Available Trips</h1>
      <ul>
        {trips.map((trip) => (
          <li key={trip.id}>
            {trip.destination} - ${trip.price}
          </li>
        ))}
      </ul>
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default Trips;
