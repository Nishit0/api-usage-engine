import express from "express";
import { getBillingSummary } from "../controllers/billing.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/summary", getBillingSummary);

export default router;
