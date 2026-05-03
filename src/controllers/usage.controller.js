import { getUsageStatsByApiKey } from "../services/usage.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendData } from "../utils/http.js";

export const getUsageStats = asyncHandler(async (req, res) => {
  const stats = await getUsageStatsByApiKey(req.user._id);

  sendData(res, stats);
});
