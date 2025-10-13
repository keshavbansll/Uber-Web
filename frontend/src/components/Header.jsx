import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
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
          <button className="header-link-btn" onClick={handleLogin}>
            Log in
          </button>
          <button className="signup-btn" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
