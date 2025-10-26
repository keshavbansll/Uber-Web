import mongoose from "mongoose";

const rideSchema = new mongoose.Schema(
  {
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    pickup: { type: String, required: true },
    dropoff: { type: String, required: true },
    pickupCoords: { type: [Number], required: true },
    dropoffCoords: { type: [Number], required: true },
    status: {
      type: String,
      enum: ["requested", "accepted", "onway", "completed"],
      default: "requested",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ride || mongoose.model("Ride", rideSchema);
