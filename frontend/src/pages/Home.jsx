import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Go anywhere with Uber</h1>

        <div className="ride-inputs">
          <input type="text" placeholder="Pickup location" />
          <input type="text" placeholder="Dropoff location" />
          <input type="date" />
          <input type="time" />
          <button>See prices</button>
        </div>
      </section>

      <section className="suggestions">
        <h2>Suggestions</h2>
        <div className="suggestion-grid">
          {[
            { title: "Ride", desc: "Request a ride, hop in, and go." },
            { title: "Reserve", desc: "Plan your ride in advance." },
            { title: "Intercity", desc: "Affordable outstation cabs." },
            { title: "Courier", desc: "Same-day item delivery." },
            { title: "Rentals", desc: "Hire a car by the hour." },
            { title: "Bike", desc: "Two-wheeler rides nearby." },
          ].map((card) => (
            <div className="card" key={card.title}>
              <div className="card-text">
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <button>Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
