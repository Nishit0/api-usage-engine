import express from "express";
import {
  addAlertRule,
  listAlertEvents,
  listAlertRules
} from "../controllers/alert.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/rules", listAlertRules);
router.post("/rules", addAlertRule);
router.get("/events", listAlertEvents);

export default router;
