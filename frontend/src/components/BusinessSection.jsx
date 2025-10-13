import React from "react";
import "./BusinessSection.css";

export default function BusinessSection() {
  return (
    <section className="business-section">
      <div className="business-container">
        <div className="business-content">
          <h2 className="business-title">
            The Uber you know, reimagined for business
          </h2>
          <p className="business-description">
            Uber for Business is a platform for managing global rides and meals,
            and local deliveries, for companies of any size.
          </p>
          <div className="business-buttons">
            <button className="business-cta-btn">Get started</button>
            <a href="#solutions" className="business-link">
              Check out our solutions
            </a>
          </div>
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
