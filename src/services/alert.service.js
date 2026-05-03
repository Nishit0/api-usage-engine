import AlertEvent from "../models/AlertEvent.model.js";
import AlertRule from "../models/AlertRule.model.js";
import UsageLog from "../models/UsageLog.model.js";
import { createHttpError } from "../utils/http.js";

export const createAlertRule = async (userId, data) => {
  const threshold = Number(data.threshold);

  if (!data.name || !Number.isInteger(threshold) || threshold < 1) {
    throw createHttpError("Name and a positive threshold are required", 400);
  }

  return await AlertRule.create({
    user: userId,
    name: data.name,
    apiKey: data.apiKey || null,
    threshold,
    isActive: data.isActive ?? true
  });
};

export const getAlertRules = async (userId) => {
  return await AlertRule.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();
};

export const getAlertEvents = async (userId) => {
  return await AlertEvent.find({ user: userId })
    .populate("rule", "name")
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
};

export const evaluateUsageAlerts = async ({ user, apiKey }) => {
  if (!user || !apiKey) return;

  const rules = await AlertRule.find({
    user,
    isActive: true,
    $or: [{ apiKey }, { apiKey: null }]
  });

  await Promise.all(rules.map(async (rule) => {
    const usageFilter = { user };

    if (rule.apiKey) {
      usageFilter.apiKey = rule.apiKey;
    }

    const currentUsage = await UsageLog.countDocuments(usageFilter);

    if (currentUsage < rule.threshold) return;

    const alertApiKey = rule.apiKey || null;
    const message = rule.apiKey
      ? `${rule.name}: ${alertApiKey} crossed ${rule.threshold} requests`
      : `${rule.name}: total usage crossed ${rule.threshold} requests`;

    await AlertEvent.findOneAndUpdate(
      {
        rule: rule._id,
        apiKey: alertApiKey,
        threshold: rule.threshold
      },
      {
        $setOnInsert: {
          user,
          rule: rule._id,
          apiKey: alertApiKey,
          threshold: rule.threshold,
          currentUsage,
          message
        }
      },
      { new: true, upsert: true }
    );

    rule.lastTriggeredAt = new Date();
    await rule.save();
  }));
};
