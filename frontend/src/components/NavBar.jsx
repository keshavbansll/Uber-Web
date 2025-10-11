// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Uber
        </Link>
        <Link to="/rider">Ride</Link>
        <Link to="/driver">Drive</Link>
        <Link to="/business">Business</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="navbar-right">
        <Link to="/help">Help</Link>
        <Link to="/login">Log in</Link>
        <Link to="/register" className="signup-btn">
          Sign up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
