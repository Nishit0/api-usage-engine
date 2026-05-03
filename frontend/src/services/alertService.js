import { apiClient } from "./apiClient.js";

export const alertService = {
  getRules() {
    return apiClient.get("/alerts/rules");
  },

  createRule(payload) {
    return apiClient.post("/alerts/rules", payload);
  },

  getEvents() {
    return apiClient.get("/alerts/events");
  }
};
