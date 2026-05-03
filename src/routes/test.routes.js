import express from "express";
import { validateApiKey } from "../middleware/apiKey.middleware.js";
import { rateLimiter } from "../middleware/rateLimit.middleware.js";
import { usageLogger } from "../middleware/logger.middleware.js";

const router = express.Router();

router.get(
  "/test",
  validateApiKey,
  rateLimiter,
  usageLogger,
  (req, res) => {
    res.json({ message: "Protected API working 🚀" });
  }
);

export default router;