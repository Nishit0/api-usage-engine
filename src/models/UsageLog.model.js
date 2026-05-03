import mongoose from "mongoose";

const usageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  apiKey: String,
  endpoint: String,
  method: String,
  status: Number,
  responseTime: Number
}, { timestamps: true });

export default mongoose.model("UsageLog", usageSchema);
