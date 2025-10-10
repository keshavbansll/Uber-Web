import express from "express";
import Ride from "../models/Ride.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// 🔒 Middleware to verify token and attach user to req
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // now req.user is defined
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default (io) => {
  // POST /api/rides — Rider creates ride
  router.post("/", protect, async (req, res) => {
    try {
      const { pickup, dropoff, pickupCoords, dropoffCoords } = req.body;

      const ride = await Ride.create({
        riderId: req.user.id, // now works
        pickup,
        dropoff,
        pickupCoords,
        dropoffCoords,
        status: "requested",
      });

      // notify drivers in real time
      io.emit("new-ride", ride);

      res.status(201).json(ride);
    } catch (error) {
      console.error("Error creating ride:", error);
      res.status(500).json({ message: "Server error while creating ride" });
    }
  });

  return router;
};
