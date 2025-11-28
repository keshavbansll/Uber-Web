import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverSection.css";

export default function DriverSection() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

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

  const handleGetStarted = () => {
    navigate("/register");
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleDashboard = () => {
    if (user?.role === "driver") {
      navigate("/driver");
    } else {
      navigate("/rider");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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
          {/* Heading and description change based on login status */}
          {user ? (
            <>
              <h2 className="driver-title">
                Welcome back, {user.name.split(" ")[0]}.
              </h2>
              <p className="driver-description">
                You are signed in as a {user.role}. Manage your trips, earnings,
                and preferences from your dashboard.
              </p>

              <div className="driver-actions">
                <button className="driver-cta-btn" onClick={handleDashboard}>
                  Go to dashboard
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="driver-title">
                Drive when you want, make what you need
              </h2>
              <p className="driver-description">
                Connect with thousands of riders and earn more per week with
                Uber's free fleet management tools. Flexible hours, reliable
                payouts, and support to help you grow.
              </p>

              <div className="driver-actions">
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
