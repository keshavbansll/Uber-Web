import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import rideRoutes from "./routes/rides.js";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/rides", rideRoutes(io));

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => res.send("API running"));

// Socket.IO example
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("ride-request", (data) => {
    io.emit("new-ride", data);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
