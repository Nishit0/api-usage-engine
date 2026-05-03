import { getBillingSummaryByApiKey } from "../services/billing.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendData } from "../utils/http.js";

export const getBillingSummary = asyncHandler(async (req, res) => {
  const summary = await getBillingSummaryByApiKey(req.user._id);

  sendData(res, summary);
});
