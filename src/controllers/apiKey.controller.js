import { createApiKey, getApiKeys } from "../services/apiKey.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendCreated, sendData } from "../utils/http.js";

export const createKey = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const apiKey = await createApiKey(name, req.user._id);

  sendCreated(res, apiKey);
});

export const listKeys = asyncHandler(async (req, res) => {
  const apiKeys = await getApiKeys(req.user._id);

  sendData(res, apiKeys);
});
