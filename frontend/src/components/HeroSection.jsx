import React, { useState } from "react";
import "./HeroSection.css";
import MapComponent from "./MapComponent";

export default function HeroSection() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [date, setDate] = useState("Today");
  const [time, setTime] = useState("Now");
  const [coords, setCoords] = useState(null); // to track map clicks

  const handleSeePrices = () => {
    console.log("See prices clicked");
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
                  <input
                    type="text"
                    className="location-input"
                    placeholder="Pickup location"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
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

              <div className="login-prompt">
                <span>Log in to see your recent activity</span>
                <button type="button" className="login-btn-inline">
                  Log in
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: full-height map panel */}
        <div className="hero-map-panel" aria-hidden="true">
          <MapComponent coords={coords} setCoords={setCoords} />
        </div>
      </div>
    </section>
  );
}
