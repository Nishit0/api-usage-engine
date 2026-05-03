import Pricing from "../models/Pricing.model.js";
import UsageLog from "../models/UsageLog.model.js";

const DEFAULT_PRICING = {
  name: "default",
  requestsPerUnit: 1000,
  unitCost: 1,
  currency: "UNIT"
};

const roundCost = (value) => Math.round(value * 10000) / 10000;

export const getBillingSummaryByApiKey = async (userId) => {
  const pricing = await Pricing.findOne({ isActive: true })
    .sort({ createdAt: -1 })
    .lean();

  const activePricing = pricing || DEFAULT_PRICING;

  const usage = await UsageLog.aggregate([
    {
      $match: { user: userId }
    },
    {
      $group: {
        _id: "$apiKey",
        totalRequests: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: 0,
        apiKey: "$_id",
        totalRequests: 1
      }
    },
    { $sort: { totalRequests: -1 } }
  ]);

  return usage.map((item) => {
    const billableUnits = item.totalRequests / activePricing.requestsPerUnit;
    const totalCost = billableUnits * activePricing.unitCost;

    return {
      apiKey: item.apiKey,
      totalRequests: item.totalRequests,
      billableUnits: roundCost(billableUnits),
      unitCost: activePricing.unitCost,
      totalCost: roundCost(totalCost),
      currency: activePricing.currency,
      pricing: {
        name: activePricing.name,
        requestsPerUnit: activePricing.requestsPerUnit,
        unitCost: activePricing.unitCost,
        currency: activePricing.currency
      }
    };
  });
};
