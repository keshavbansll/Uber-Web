import React, { useState, useEffect, useRef } from "react";
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
  const [showPrices, setShowPrices] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Stay tuned");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const pricesRef = useRef(null);

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

  // close price menu when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (pricesRef.current && !pricesRef.current.contains(e.target)) {
        setShowPrices(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleSeePrices = (e) => {
    e.stopPropagation();
    setShowPrices((s) => !s);
  };

  const handlePriceSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowPrices(false);
    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);
      setSelectedVehicle("");
    }, 8000);
  };

  const handleCancelLoading = () => {
    setShowLoading(false);
    setSelectedVehicle("");
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

  // Update loading messages while showLoading is true
  useEffect(() => {
    if (!showLoading) return;

    const messages = [
      "Stay tuned",
      "Connecting to nearby drivers",
      "A few more minutes",
      "Almost there",
      "We'll notify you soon",
    ];

    let index = 0;
    setLoadingMessage(messages[index]);

    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingMessage(messages[index]);
    }, 2500);

    return () => clearInterval(interval);
  }, [showLoading]);

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

                  <div className="prices-wrapper" ref={pricesRef}>
                    <button
                      type="button"
                      className="see-prices-btn"
                      onClick={handleSeePrices}
                      aria-expanded={showPrices}
                      aria-controls="price-menu"
                    >
                      See prices
                    </button>

                    {showPrices && (
                      <div
                        id="price-menu"
                        className="price-menu"
                        role="dialog"
                        aria-label="Price options"
                      >
                        <div className="price-menu-group">
                          {[
                            { vehicle: "Bike", price: "₹175" },
                            { vehicle: "Bike Saver", price: "₹150" },
                            { vehicle: "Hatchback", price: "₹250" },
                            { vehicle: "Sedan", price: "₹300" },
                            { vehicle: "Premium", price: "₹700" },
                          ].map((item, idx) => (
                            <div
                              key={idx}
                              className="price-item"
                              onClick={() => handlePriceSelect(item.vehicle)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="vehicle">{item.vehicle}</div>
                              <div className="price">{item.price}</div>
                            </div>
                          ))}
                        </div>
                        <div
                          className="price-item"
                          onClick={() => handlePriceSelect("Rentals")}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="vehicle">Rentals (per hour)</div>
                          <div className="price">₹1,200</div>
                        </div>
                      </div>
                    )}
                  </div>
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

      {/* Loading Dialog */}
      {showLoading && (
        <div className="loading-overlay" onClick={handleCancelLoading}>
          <div className="loading-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="loading-bars">
              <div className="loading-bar">
                <div className="loading-bar-fill" />
              </div>
              <div className="loading-bar">
                <div className="loading-bar-fill" />
              </div>
              <div className="loading-bar">
                <div className="loading-bar-fill" />
              </div>
              <div className="loading-bar">
                <div className="loading-bar-fill" />
              </div>
            </div>
            <div className="loading-message">{loadingMessage}</div>
            <div className="loading-submessage">
              We're connecting you with nearby {selectedVehicle} drivers.
              <br />
              This usually takes a few moments.
            </div>
            <button
              type="button"
              className="loading-cancel-btn"
              onClick={handleCancelLoading}
            >
              Cancel request
            </button>
          </div>
        </div>
      )}

      {/* LinkedIn Ad */}
      <div className="linkedin-ad">
        <div className="linkedin-icon">in</div>
        <div className="linkedin-title">Connect with the Developer</div>
        <div className="linkedin-description">
          Follow my journey in building amazing web experiences and connect with me on LinkedIn
        </div>

        <a
          href="https://www.linkedin.com/in/keshavbansll/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button type="button" className="linkedin-btn">
            Visit LinkedIn Profile
          </button>
        </a>
      </div>
    </section>
  );
}
