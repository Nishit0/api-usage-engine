import ApiKey from "../models/ApiKey.model.js";
import { generateKey } from "../utils/generateKey.js";

export const createApiKey = async (name, userId) => {
  return await ApiKey.create({
    key: generateKey(),
    name,
    user: userId
  });
};

export const getApiKeys = async (userId) => {
  return await ApiKey.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();
};
