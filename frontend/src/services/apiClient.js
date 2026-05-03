import { tokenStorage } from "./tokenStorage.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(tokenStorage.getToken() ? { Authorization: `Bearer ${tokenStorage.getToken()}` } : {}),
      ...options.headers
    },
    ...options
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || "Request failed";
    throw new ApiError(message, response.status, data);
  }

  return data;
};

export const apiClient = {
  get(path, options = {}) {
    return request(path, { ...options, method: "GET" });
  },

  post(path, body, options = {}) {
    return request(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body)
    });
  }
};
