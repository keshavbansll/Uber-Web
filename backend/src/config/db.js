import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  const envUri = process.env.MONGO_URI;
  const localFallback = "mongodb://127.0.0.1:27017/uber-web";
  const uri = envUri && envUri.length ? envUri : localFallback;

  try {
    await mongoose.connect(uri, {});
    console.log(
      "MongoDB connected to",
      uri.startsWith("mongodb://127.0.0.1")
        ? "127.0.0.1:27017 (local)"
        : "remote host"
    );
  } catch (err) {
    console.error("MongoDB connection error:", err.message || err);
    if (!envUri) {
      console.error("Hint: MONGO_URI not set. Using fallback:", localFallback);
    }
    process.exit(1);
  }
};

export default connectDB;
