import { apiClient } from "./apiClient.js";

export const billingService = {
  async getBillingSummary() {
    return apiClient.get("/billing/summary");
  }
};
