export const dashboardService = {
  async getTotalCalls() {
    return {
      data: {
        total: 1248
      }
    };
  },

  async getCallsPerDay() {
    return {
      data: [
        { date: "Mon", calls: 120 },
        { date: "Tue", calls: 180 },
        { date: "Wed", calls: 240 },
        { date: "Thu", calls: 200 },
        { date: "Fri", calls: 320 },
        { date: "Sat", calls: 110 },
        { date: "Sun", calls: 78 }
      ]
    };
  },

  async getTopApiKeys() {
    return {
      data: [
        {
          key: "pk_live_alpha",
          requests: 542,
          averageLatency: 120
        },
        {
          key: "pk_live_beta",
          requests: 391,
          averageLatency: 98
        },
        {
          key: "pk_live_gamma",
          requests: 315,
          averageLatency: 143
        }
      ]
    };
  }
};