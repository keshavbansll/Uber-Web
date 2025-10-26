import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsProfileOpen(false);
    navigate("/");
  };

  const handleDashboard = () => {
    if (user?.role === "driver") {
      navigate("/driver");
    } else {
      navigate("/rider");
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => navigate("/")}>
            Uber
          </div>
          <nav className="nav-links">
            <a href="#ride" className="nav-link">
              Ride
            </a>
            <a href="#drive" className="nav-link">
              Drive
            </a>
            <a href="#business" className="nav-link">
              Business
            </a>
            <div
              className="nav-link dropdown"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              About
              <span className="dropdown-arrow">▼</span>
              {isAboutOpen && (
                <div className="dropdown-menu">
                  <a href="#about">About us</a>
                  <a href="#offerings">Our offerings</a>
                  <a href="#newsroom">Newsroom</a>
                  <a href="#investors">Investors</a>
                  <a href="#blog">Blog</a>
                  <a href="#careers">Careers</a>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="header-right">
          <div className="language-selector">
            <span className="globe-icon">🌐</span>
            <span>EN</span>
          </div>
          <a href="#help" className="header-link">
            Help
          </a>

          {/* Conditional rendering based on login status */}
          {user ? (
            <div
              className="profile-dropdown"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              <div className="profile-icon-wrapper">
                <div className="profile-icon">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              {isProfileOpen && (
                <div className="dropdown-menu profile-menu">
                  <div className="profile-menu-header">
                    <div className="profile-menu-name">{user.name}</div>
                    <div className="profile-menu-role">{user.role}</div>
                  </div>
                  <a
                    href="#profile"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDashboard();
                    }}
                  >
                    Dashboard
                  </a>
                  <a href="#settings">Settings</a>
                  <a
                    href="#logout"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                    }}
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <>
              <button className="header-link-btn" onClick={handleLogin}>
                Log in
              </button>
              <button className="signup-btn" onClick={handleSignUp}>
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
