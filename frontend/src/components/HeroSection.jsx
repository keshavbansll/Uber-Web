// HeroSection.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
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
  const [selectedFare, setSelectedFare] = useState(null);

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const pricesRef = useRef(null);

  // LinkedIn ad ref for dragging
  const linkedinRef = useRef(null);

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

  // Haversine formula to compute distance between two lat/lng pairs in kilometers
  function getDistanceKm(a, b) {
    if (!a || !b) return 0;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371; // Earth radius km
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lng - a.lng);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);

    const sinDLat = Math.sin(dLat / 2);
    const sinDLon = Math.sin(dLon / 2);
    const hav =
      sinDLat * sinDLat +
      Math.cos(lat1) * Math.cos(lat2) * sinDLon * sinDLon;
    const c = 2 * Math.atan2(Math.sqrt(hav), Math.sqrt(1 - hav));
    return R * c;
  }

  // Rates per km
  const RATES_PER_KM = {
    Bike: 13,
    "Bike Saver": 11,
    Hatchback: 18,
    Sedan: 22,
    Premium: 45,
  };

  // Compute distance and fares when coords change
  const { distanceKm, distanceText, computedFares } = useMemo(() => {
    let dist = 0;
    if (pickupCoords && dropoffCoords) {
      dist = getDistanceKm(pickupCoords, dropoffCoords);
    }
    const distRounded = Math.max(0, dist);
    const distText = distRounded ? `${distRounded.toFixed(1)} km` : null;

    // If we have a real distance, compute dynamic fares; otherwise use fallback static prices
    const fares = [];
    if (distRounded > 0.05) {
      Object.entries(RATES_PER_KM).forEach(([vehicle, rate]) => {
        // compute fare, round up to nearest rupee
        const fare = Math.max(1, Math.ceil(distRounded * rate));
        fares.push({ vehicle, price: `₹${fare}`, rawFare: fare });
      });
      // Rentals treated separately as hourly fixed rate
      fares.push({ vehicle: "Rentals", price: "₹1,200 (per hour)", rawFare: 1200 });
    } else {
      // fallback static list when coords are unavailable or same location
      fares.push({ vehicle: "Bike", price: "₹175", rawFare: 175 });
      fares.push({ vehicle: "Bike Saver", price: "₹150", rawFare: 150 });
      fares.push({ vehicle: "Hatchback", price: "₹250", rawFare: 250 });
      fares.push({ vehicle: "Sedan", price: "₹300", rawFare: 300 });
      fares.push({ vehicle: "Premium", price: "₹700", rawFare: 700 });
      fares.push({ vehicle: "Rentals", price: "₹1,200 (per hour)", rawFare: 1200 });
    }

    return {
      distanceKm: distRounded,
      distanceText: distText,
      computedFares: fares,
    };
  }, [pickupCoords, dropoffCoords]);

  const handlePriceSelect = (vehicle, fare) => {
    setSelectedVehicle(vehicle);
    setSelectedFare(fare ?? null);
    setShowPrices(false);
    setShowLoading(true);

    setTimeout(() => {
      setShowLoading(false);
      setSelectedVehicle("");
      setSelectedFare(null);
    }, 8000);
  };

  const handleCancelLoading = () => {
    setShowLoading(false);
    setSelectedVehicle("");
    setSelectedFare(null);
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

  // Draggable LinkedIn ad logic using pointer events
  useEffect(() => {
    const el = linkedinRef.current;
    if (!el) return;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let elStartLeft = 0;
    let elStartTop = 0;

    function clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }

    function onPointerDown(e) {
      e.preventDefault();
      el.setPointerCapture(e.pointerId);
      dragging = true;
      el.classList.add("dragging");

      const rect = el.getBoundingClientRect();
      el.style.left = `${rect.left}px`;
      el.style.top = `${rect.top}px`;
      el.style.right = "auto";
      el.style.bottom = "auto";
      el.style.transform = "none";

      startX = e.clientX;
      startY = e.clientY;
      elStartLeft = rect.left;
      elStartTop = rect.top;

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }

    function onPointerMove(e) {
      if (!dragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const newLeft = elStartLeft + dx;
      const newTop = elStartTop + dy;

      const margin = 8;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      const clampedLeft = clamp(newLeft, margin, vw - w - margin);
      const clampedTop = clamp(newTop, margin, vh - h - margin);

      el.style.left = `${clampedLeft}px`;
      el.style.top = `${clampedTop}px`;
    }

    function onPointerUp(e) {
      dragging = false;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch (err) {
        // ignore
      }
      el.classList.remove("dragging");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    }

    const handle = el.querySelector(".linkedin-drag-handle") || el;
    handle.addEventListener("pointerdown", onPointerDown, { passive: false });

    return () => {
      handle.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

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
                        {distanceText && (
                          <div style={{ marginBottom: 8, fontSize: 13, color: "#6b6b6b" }}>
                            Distance: {distanceText} • rates shown are estimates
                          </div>
                        )}
                        <div className="price-menu-group">
                          {computedFares.map((item, idx) => (
                            <div
                              key={idx}
                              className="price-item"
                              onClick={() => handlePriceSelect(item.vehicle, item.rawFare)}
                              style={{ cursor: "pointer" }}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handlePriceSelect(item.vehicle, item.rawFare);
                                }
                              }}
                            >
                              <div className="vehicle">{item.vehicle}</div>
                              <div className="price">{item.price}</div>
                            </div>
                          ))}
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
              dropoffCoords ? { coords: dropoffCoords, variant: "dropoff" } : null,
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
              We're connecting you with nearby {selectedVehicle}
              {selectedFare ? ` drivers. Estimated fare: ₹${selectedFare}` : " drivers."}
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

      {/* LinkedIn Ad*/}
      <div
        className="linkedin-ad"
        ref={linkedinRef}
        role="region"
        aria-label="LinkedIn developer profile"
      >
        <div className="linkedin-drag-handle" aria-hidden="true" title="Drag to move">
          <div className="linkedin-icon">in</div>
        </div>
        <div className="linkedin-body">
          <div className="linkedin-title">Connect with the Developer</div>
          <div className="linkedin-description"></div>
          <a
            className="linkedin-link"
            href="https://www.linkedin.com/in/keshavbansll/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button type="button" className="linkedin-btn">
              Visit LinkedIn Profile
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
