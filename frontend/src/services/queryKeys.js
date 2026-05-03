export const queryKeys = {
  dashboard: {
    totalCalls: ["dashboard", "total-calls"],
    callsPerDay: (days) => ["dashboard", "calls-per-day", days],
    topApiKeys: (limit) => ["dashboard", "top-api-keys", limit]
  },
  apiKeys: {
    all: ["api-keys"],
    usageStats: ["usage", "stats"]
  },
  billing: {
    summary: ["billing", "summary"]
  },
  alerts: {
    rules: ["alerts", "rules"],
    events: ["alerts", "events"]
  }
};
