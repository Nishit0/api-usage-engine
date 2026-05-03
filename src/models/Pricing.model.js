import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  name: { type: String, default: "default" },
  requestsPerUnit: { type: Number, default: 1000, min: 1 },
  unitCost: { type: Number, default: 1, min: 0 },
  currency: { type: String, default: "UNIT" },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Pricing", pricingSchema);
