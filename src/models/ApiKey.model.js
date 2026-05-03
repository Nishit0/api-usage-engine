import mongoose from "mongoose";

const apiKeySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  key: { type: String, unique: true },
  name: String,

  rateLimit: {
    limit: { type: Number, default: 10 },
    window: { type: Number, default: 60 }
  },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("ApiKey", apiKeySchema);
