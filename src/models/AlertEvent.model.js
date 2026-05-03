import mongoose from "mongoose";

const alertEventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  rule: { type: mongoose.Schema.Types.ObjectId, ref: "AlertRule", required: true, index: true },
  apiKey: { type: String, default: null },
  threshold: Number,
  currentUsage: Number,
  message: String
}, { timestamps: true });

alertEventSchema.index({ rule: 1, apiKey: 1, threshold: 1 }, { unique: true });

export default mongoose.model("AlertEvent", alertEventSchema);
