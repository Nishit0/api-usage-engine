import { apiClient } from "./apiClient.js";

export const dashboardService = {
  async getTotalCalls() {
    return apiClient.get("/dashboard/total-calls");
  },

  async getCallsPerDay(days = 30) {
    return apiClient.get(`/dashboard/calls-per-day?days=${days}`);
  },

  async getTopApiKeys(limit = 5) {
    return apiClient.get(`/dashboard/top-api-keys?limit=${limit}`);
  }
};
