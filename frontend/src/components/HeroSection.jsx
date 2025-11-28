import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import MapComponent from "./MapComponent";
import LocationAutocomplete from "./LocationAutocomplete";

export default function HeroSection() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("Now");

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in (mirror of Header logic)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const handleSeePrices = () => {
    console.log("See prices clicked");
  };

  const handleLoginNavigate = () => {
    navigate("/login");
  };

  const handleSeeActivity = () => {
    if (user?.role === "driver") {
      navigate("/driver");
    } else {
      navigate("/rider");
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Left side: heading + booking card */}
        <div className="hero-left">
          <div className="hero-left-inner">
            <h1 className="hero-title">Go anywhere with Uber</h1>

            <div className="booking-card">
              <div className="booking-form">
                <div className="input-group">
                  <div className="location-dot" aria-hidden="true" />
                  <LocationAutocomplete
                    value={pickupLocation}
                    onChange={(v) => setPickupLocation(v)}
                    onSelect={(label, coords) => {
                      setPickupLocation(label);
                      if (coords) setPickupCoords(coords);
                    }}
                    placeholder="Pickup location"
                  />
                  <button
                    type="button"
                    className="location-icon-btn"
                    aria-label="set pickup"
                  >
                    📍
                  </button>
                </div>

                <div className="input-group">
                  <div className="location-square" aria-hidden="true" />
                  <LocationAutocomplete
                    value={dropoffLocation}
                    onChange={(v) => setDropoffLocation(v)}
                    onSelect={(label, coords) => {
                      setDropoffLocation(label);
                      if (coords) setDropoffCoords(coords);
                    }}
                    placeholder="Dropoff location"
                  />
                </div>

                <div className="datetime-group">
                  <div className="datetime-input">
                    <span className="datetime-icon" aria-hidden="true">
                      📅
                    </span>
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
                    <span className="datetime-icon" aria-hidden="true">
                      🕐
                    </span>
                    <select
                      className="datetime-select"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    >
                      <option>Now</option>
                      <option>Schedule for later</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    className="see-prices-btn"
                    onClick={handleSeePrices}
                  >
                    See prices
                  </button>
                </div>
              </div>

              {/* Conditional rendering based on login status */}
              {user ? (
                <div className="login-prompt">
                  <span>See your recent activity</span>
                  <button
                    type="button"
                    className="login-btn-inline"
                    onClick={handleSeeActivity}
                  >
                    See activity
                  </button>
                </div>
              ) : (
                <div className="login-prompt">
                  <span>Log in to see your recent activity</span>
                  <button
                    type="button"
                    className="login-btn-inline"
                    onClick={handleLoginNavigate}
                  >
                    Log in
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side: full-height map panel */}
        <div className="hero-map-panel" aria-hidden="true">
          <MapComponent
            markers={[
              pickupCoords ? { coords: pickupCoords, variant: "pickup" } : null,
              dropoffCoords
                ? { coords: dropoffCoords, variant: "dropoff" }
                : null,
            ].filter(Boolean)}
          />
        </div>
      </div>
    </section>
  );
}
