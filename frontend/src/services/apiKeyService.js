import { apiClient } from "./apiClient.js";

export const apiKeyService = {
  async getApiKeys() {
    return apiClient.get("/keys");
  },

  async createApiKey(name) {
    return apiClient.post("/keys", { name });
  },

  async getUsageStats() {
    return apiClient.get("/usage/stats");
  }
};
