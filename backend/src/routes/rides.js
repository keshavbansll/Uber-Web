import express from "express";
import Ride from "../models/Ride.js";
import jwt from "jsonwebtoken";

const router = express.Router();

export default (io) => {
  // POST /api/rides
  router.post("/", async (req, res) => {
    // extract ride data
    const { pickup, dropoff, pickupCoords, dropoffCoords } = req.body;

    // normally you'd have auth middleware to get req.user
    const ride = await Ride.create({
      riderId: req.user.id,
      pickup,
      dropoff,
      pickupCoords,
      dropoffCoords,
      status: "requested",
    });

    io.emit("new-ride", ride); // emit event
    res.status(201).json(ride);
  });

  return router;
};
