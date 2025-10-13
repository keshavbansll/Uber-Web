import React from "react";
import { useNavigate } from "react-router-dom";
import "./DriverSection.css";

export default function DriverSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <section className="driver-section">
      <div className="driver-container">
        <div className="driver-image">
          <div className="driver-illustration">
            <div className="confetti"></div>
            <div className="driver-scene">
              <div className="car"></div>
              <div className="person"></div>
            </div>
          </div>
        </div>

        <div className="driver-content">
          <h2 className="driver-title">
            Drive when you want, make what you need
          </h2>
          <p className="driver-description">
            Connect with thousands of drivers and earn more per week with Uber's
            free fleet management tools.
          </p>
          <button className="driver-cta-btn" onClick={handleGetStarted}>
            Get started
          </button>
          <a
            href="#sign-in"
            className="driver-learn-more"
            onClick={(e) => {
              e.preventDefault();
              handleSignIn();
            }}
          >
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </section>
  );
}
