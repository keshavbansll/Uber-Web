import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">Uber</h3>
            <a href="#help" className="footer-help-link">
              Visit Help Center
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-list">
              <li>
                <a href="#about">About us</a>
              </li>
              <li>
                <a href="#offerings">Our offerings</a>
              </li>
              <li>
                <a href="#newsroom">Newsroom</a>
              </li>
              <li>
                <a href="#investors">Investors</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Products</h4>
            <ul className="footer-list">
              <li>
                <a href="#ride">Ride</a>
              </li>
              <li>
                <a href="#drive">Drive</a>
              </li>
              <li>
                <a href="#eat">Eat</a>
              </li>
              <li>
                <a href="#business">Uber for Business</a>
              </li>
              <li>
                <a href="#freight">Uber Freight</a>
              </li>
              <li>
                <a href="#gift">Gift cards</a>
              </li>
              <li>
                <a href="#health">Uber Health</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Global citizenship</h4>
            <ul className="footer-list">
              <li>
                <a href="#safety">Safety</a>
              </li>
              <li>
                <a href="#sustainability">Sustainability</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Travel</h4>
            <ul className="footer-list">
              <li>
                <a href="#reserve">Reserve</a>
              </li>
              <li>
                <a href="#airports">Airports</a>
              </li>
              <li>
                <a href="#cities">Cities</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-social">
          <a href="#linkedin" className="social-icon" aria-label="LinkedIn">
            in
          </a>
          <a href="#youtube" className="social-icon" aria-label="YouTube">
            ▶
          </a>
          <a href="#instagram" className="social-icon" aria-label="Instagram">
            📷
          </a>
          <a href="#twitter" className="social-icon" aria-label="Twitter">
            𝕏
          </a>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="language-selector">
              <span className="globe-icon">🌐</span>
              <span>English</span>
            </div>
            <div className="location-selector">
              <span className="location-icon">📍</span>
              <span>Jaipur</span>
            </div>
          </div>

          <div className="footer-bottom-right">
            <span>© 2025 Uber Technologies Inc.</span>
          </div>
        </div>

        <div className="footer-legal">
          <a href="#privacy">Privacy</a>
          <a href="#accessibility">Accessibility</a>
          <a href="#terms">Terms</a>
        </div>

        <div className="footer-app-badges">
          <a href="#google-play" className="app-badge">
            <div className="badge-content">
              <span className="badge-text-small">GET IT ON</span>
              <span className="badge-text-large">Google Play</span>
            </div>
          </a>
          <a href="#app-store" className="app-badge">
            <div className="badge-content">
              <span className="badge-text-small">Download on the</span>
              <span className="badge-text-large">App Store</span>
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}
