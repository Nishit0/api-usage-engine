import express from "express";
import { getUsageStats } from "../controllers/usage.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/stats", getUsageStats);

export default router;
