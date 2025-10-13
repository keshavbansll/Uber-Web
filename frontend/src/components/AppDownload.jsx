import React from "react";
import "./AppDownload.css";

export default function AppDownload() {
  return (
    <section className="app-download-section">
      <div className="app-download-container">
        <h2 className="app-download-title">It's easier in the apps</h2>

        <div className="app-cards">
          <div className="app-card">
            <div className="qr-code">
              <div className="qr-pattern"></div>
            </div>
            <div className="app-card-content">
              <h3 className="app-card-title">Download the Uber app</h3>
              <p className="app-card-subtitle">Scan to download</p>
              <span className="app-arrow">→</span>
            </div>
          </div>

          <div className="app-card">
            <div className="qr-code">
              <div className="qr-pattern"></div>
            </div>
            <div className="app-card-content">
              <h3 className="app-card-title">Download the Driver app</h3>
              <p className="app-card-subtitle">Scan to download</p>
              <span className="app-arrow">→</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
