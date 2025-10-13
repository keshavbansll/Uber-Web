import React from "react";
import "./Suggestions.css";

const suggestions = [
  {
    title: "Ride",
    description: "Go anywhere with Uber. Request a ride, hop in, and go.",
    icon: "🚗",
    link: "#",
  },
  {
    title: "Reserve",
    description:
      "Reserve your ride in advance so you can relax on the day of your trip.",
    icon: "🕐",
    link: "#",
  },
  {
    title: "Intercity",
    description:
      "Get convenient, affordable outstation cabs anytime at your doorstep.",
    icon: "🚙",
    link: "#",
  },
  {
    title: "Courier",
    description: "Uber makes same-day item delivery easier than ever.",
    icon: "📦",
    link: "#",
  },
  {
    title: "Rentals",
    description: "Request a trip for a block of time and make multiple stops.",
    icon: "🔑",
    link: "#",
  },
  {
    title: "Bike",
    description: "Get affordable motorbike rides in minutes at your doorstep.",
    icon: "🏍️",
    link: "#",
  },
];

export default function Suggestions() {
  return (
    <section className="suggestions-section">
      <div className="suggestions-container">
        <h2 className="suggestions-title">Suggestions</h2>

        <div className="suggestions-grid">
          {suggestions.map((item, index) => (
            <div key={index} className="suggestion-card">
              <div className="suggestion-icon">{item.icon}</div>
              <div className="suggestion-content">
                <h3 className="suggestion-name">{item.title}</h3>
                <p className="suggestion-description">{item.description}</p>
                <a href={item.link} className="suggestion-link">
                  Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
