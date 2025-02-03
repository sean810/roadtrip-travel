import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Bookings from "./pages/Bookings";
import SignUp from "./components/SignUp"; // Import SignUp component
import Login from "./components/Login"; // Import Login component
import "./styles/App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/signup" element={<SignUp />} /> {/* Add SignUp route */}
          <Route path="/login" element={<Login />} /> {/* Add Login route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
