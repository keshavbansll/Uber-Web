import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BusinessSection.css";

export default function BusinessSection() {
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
    <section className="business-section">
      <div className="business-container">
        <div className="business-content">
          {user ? (
            <>
              <h2 className="business-title">
                Welcome, {user.name.split(" ")[0]}. Your business tools are
                ready
              </h2>
              <p className="business-description">
                Manage your trips, payments, and preferences with one unified
                dashboard tailored to your role.
              </p>
              <div className="business-buttons">
                <button className="business-cta-btn" onClick={handleDashboard}>
                  Go to dashboard
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="business-title">
                The Uber you know, reimagined for business
              </h2>
              <p className="business-description">
                Uber for Business is a platform for managing global rides and
                meals, and local deliveries, for companies of any size.
              </p>
              <div className="business-buttons">
                <button className="business-cta-btn" onClick={handleGetStarted}>
                  Get started
                </button>
                <a
                  href="#solutions"
                  className="business-link"
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

        <div className="business-image">
          <div className="business-illustration">
            <div className="business-scene">
              <div className="building"></div>
              <div className="plane">✈️</div>
              <div className="road"></div>
              <div className="business-car"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
