import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>RoadTrip Travel</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/trips">Trips</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>  {/* Add Sign Up link */}
        <li><Link to="/login">Login</Link></li>    {/* Add Login link */}
      </ul>
    </nav>
  );
}

export default Navbar;
