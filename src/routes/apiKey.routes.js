import express from "express";
import { createKey, listKeys } from "../controllers/apiKey.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(requireAuth);
router.get("/", listKeys);
router.post("/", createKey);

export default router;
