import React, { useEffect, useState } from "react";
import socket from "../socket";

const DriverDashboard = () => {
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // listen for new ride events
    socket.on("new-ride", (ride) => {
      setRides((prev) => [ride, ...prev]); // add to list
    });

    return () => socket.off("new-ride");
  }, []);

  return (
    <div>
      <h1>Driver Dashboard</h1>
      <ul>
        {rides.map((r) => (
          <li key={r._id}>
            {r.pickup} → {r.dropoff} ({r.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriverDashboard;
