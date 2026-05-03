import UsageLog from "../models/UsageLog.model.js";
import { evaluateUsageAlerts } from "./alert.service.js";

export const logUsage = async (data) => {
  const usageLog = await UsageLog.create(data);
  await evaluateUsageAlerts(data);

  return usageLog;
};

export const getUsageStatsByApiKey = async (userId) => {
  return await UsageLog.aggregate([
    {
      $match: { user: userId }
    },
    {
      $group: {
        _id: "$apiKey",
        totalRequests: { $sum: 1 },
        successfulRequests: {
          $sum: {
            $cond: [
              { $and: [{ $gte: ["$status", 200] }, { $lt: ["$status", 400] }] },
              1,
              0
            ]
          }
        },
        averageResponseTime: { $avg: "$responseTime" }
      }
    },
    {
      $project: {
        _id: 0,
        apiKey: "$_id",
        totalRequests: 1,
        successRate: {
          $cond: [
            { $eq: ["$totalRequests", 0] },
            0,
            {
              $round: [
                {
                  $multiply: [
                    { $divide: ["$successfulRequests", "$totalRequests"] },
                    100
                  ]
                },
                2
              ]
            }
          ]
        },
        averageResponseTime: { $round: ["$averageResponseTime", 2] }
      }
    },
    { $sort: { totalRequests: -1 } }
  ]);
};
