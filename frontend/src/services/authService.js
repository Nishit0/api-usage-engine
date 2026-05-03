import { apiClient } from "./apiClient.js";

export const authService = {
  register(payload) {
    return apiClient.post("/auth/register", payload);
  },

  login(payload) {
    return apiClient.post("/auth/login", payload);
  }
};
