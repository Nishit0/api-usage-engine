import express from "express";

import alertRoutes from "./alert.routes.js";
import apiKeyRoutes from "./apiKey.routes.js";
import authRoutes from "./auth.routes.js";
import billingRoutes from "./billing.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import testRoutes from "./test.routes.js";
import usageRoutes from "./usage.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/alerts", alertRoutes);
router.use("/keys", apiKeyRoutes);
router.use("/usage", usageRoutes);
router.use("/billing", billingRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", testRoutes);

export default router;
