import UsageLog from "../models/UsageLog.model.js";

const toPositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const getTotalApiCalls = async (userId) => {
  return await UsageLog.countDocuments({ user: userId });
};

export const getCallsPerDay = async (userId, days = 30) => {
  const safeDays = toPositiveInteger(days, 30);
  const startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  startDate.setUTCDate(startDate.getUTCDate() - safeDays + 1);

  return await UsageLog.aggregate([
    {
      $match: {
        user: userId,
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%Y-%m-%d",
            date: "$createdAt"
          }
        },
        calls: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        calls: 1
      }
    },
    { $sort: { date: 1 } }
  ]);
};

export const getTopApiKeysByUsage = async (userId, limit = 5) => {
  const safeLimit = toPositiveInteger(limit, 5);

  return await UsageLog.aggregate([
    {
      $match: { user: userId }
    },
    {
      $group: {
        _id: "$apiKey",
        calls: { $sum: 1 },
        averageResponseTime: { $avg: "$responseTime" },
        lastUsedAt: { $max: "$createdAt" }
      }
    },
    {
      $project: {
        _id: 0,
        apiKey: "$_id",
        calls: 1,
        averageResponseTime: { $round: ["$averageResponseTime", 2] },
        lastUsedAt: 1
      }
    },
    { $sort: { calls: -1 } },
    { $limit: safeLimit }
  ]);
};
