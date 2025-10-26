import jwt from "jsonwebtoken";
import { connectDB } from "./_db.js";
import Ride from "./_models/Ride.js";

const protect = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  await connectDB();

  try {
    const user = protect(req);
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }

  // POST /api/rides - Create ride
  if (req.method === "POST") {
    try {
      const { pickup, dropoff, pickupCoords, dropoffCoords } = req.body;

      const ride = await Ride.create({
        riderId: req.user.id,
        pickup,
        dropoff,
        pickupCoords,
        dropoffCoords,
        status: "requested",
      });

      return res.status(201).json(ride);
    } catch (error) {
      console.error("Error creating ride:", error);
      return res
        .status(500)
        .json({ message: "Server error while creating ride" });
    }
  }

  // GET /api/rides - Get all rides
  if (req.method === "GET") {
    try {
      const rides = await Ride.find().populate("riderId", "name email");
      return res.status(200).json(rides);
    } catch (error) {
      console.error("Error fetching rides:", error);
      return res
        .status(500)
        .json({ message: "Server error while fetching rides" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
