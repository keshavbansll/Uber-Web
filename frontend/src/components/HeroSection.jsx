import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

export default function HeroSection() {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("Now");

  const handleSeePrices = () => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "rider") {
        navigate("/rider");
      } else {
        navigate("/driver");
      }
    } else {
      // Redirect to login page
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <h1 className="hero-title">Go anywhere with Uber</h1>

        <div className="booking-card">
          <div className="booking-form">
            <div className="input-group">
              <div className="location-dot"></div>
              <input
                type="text"
                className="location-input"
                placeholder="Pickup location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
              <button className="location-icon-btn">📍</button>
            </div>

            <div className="input-group">
              <div className="location-square"></div>
              <input
                type="text"
                className="location-input"
                placeholder="Dropoff location"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
              />
            </div>

            <div className="datetime-group">
              <div className="datetime-input">
                <span className="datetime-icon">📅</span>
                <select
                  className="datetime-select"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                >
                  <option>Today</option>
                  <option>Tomorrow</option>
                </select>
              </div>

              <div className="datetime-input">
                <span className="datetime-icon">🕐</span>
                <select
                  className="datetime-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option>Now</option>
                  <option>Schedule for later</option>
                </select>
              </div>

              <button className="see-prices-btn" onClick={handleSeePrices}>
                See prices
              </button>
            </div>
          </div>

          <div className="login-prompt">
            <span>Log in to see your recent activity</span>
            <button className="login-btn-inline" onClick={handleLogin}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
