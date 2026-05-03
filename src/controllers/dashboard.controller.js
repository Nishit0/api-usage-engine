import {
  getCallsPerDay,
  getTopApiKeysByUsage,
  getTotalApiCalls
} from "../services/dashboard.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendData } from "../utils/http.js";

export const totalApiCalls = asyncHandler(async (req, res) => {
  const total = await getTotalApiCalls(req.user._id);

  sendData(res, { total });
});

export const callsPerDay = asyncHandler(async (req, res) => {
  const days = req.query.days;
  const calls = await getCallsPerDay(req.user._id, days);

  sendData(res, calls);
});

export const topApiKeysByUsage = asyncHandler(async (req, res) => {
  const limit = req.query.limit;
  const apiKeys = await getTopApiKeysByUsage(req.user._id, limit);

  sendData(res, apiKeys);
});
