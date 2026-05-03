import ApiKey from "../models/ApiKey.model.js";

export const validateApiKey = async (req, res, next) => {
  const key = req.headers["x-api-key"];

  if (!key) return res.status(401).json({ message: "API key missing" });

  const apiKey = await ApiKey.findOne({ key });

  if (!apiKey || !apiKey.isActive) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  req.apiKey = apiKey;
  next();
};