import express from "express";
import {
  callsPerDay,
  topApiKeysByUsage,
  totalApiCalls
} from "../controllers/dashboard.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/total-calls", totalApiCalls);
router.get("/calls-per-day", callsPerDay);
router.get("/top-api-keys", topApiKeysByUsage);

export default router;
