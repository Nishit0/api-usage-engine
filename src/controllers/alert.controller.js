import {
  createAlertRule,
  getAlertEvents,
  getAlertRules
} from "../services/alert.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendCreated, sendData } from "../utils/http.js";

export const listAlertRules = asyncHandler(async (req, res) => {
  const rules = await getAlertRules(req.user._id);

  sendData(res, rules);
});

export const addAlertRule = asyncHandler(async (req, res) => {
  const rule = await createAlertRule(req.user._id, req.body);

  sendCreated(res, rule);
});

export const listAlertEvents = asyncHandler(async (req, res) => {
  const events = await getAlertEvents(req.user._id);

  sendData(res, events);
});
