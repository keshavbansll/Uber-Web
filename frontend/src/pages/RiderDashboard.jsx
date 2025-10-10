import React, { useState } from "react";
import MapComponent from "../components/MapComponent";

const RiderDashboard = () => {
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleBookRide = () => {
    // Here you call your backend POST /api/rides
    console.log("Booking ride:", {
      pickup,
      dropoff,
      pickupCoords,
      dropoffCoords,
    });
  };

  return (
    <div>
      <h1>Rider Dashboard</h1>

      <div>
        <label>Pickup Address:</label>
        <input value={pickup} onChange={(e) => setPickup(e.target.value)} />
        <MapComponent coords={pickupCoords} setCoords={setPickupCoords} />
      </div>

      <div>
        <label>Dropoff Address:</label>
        <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
        <MapComponent coords={dropoffCoords} setCoords={setDropoffCoords} />
      </div>

      <button onClick={handleBookRide}>Book Ride</button>
    </div>
  );
};

export default RiderDashboard;
