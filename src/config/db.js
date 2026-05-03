import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("Database connected");
  } catch (err) {
    console.error("DB Error:", err.message);
    process.exit(1);
  }
};
