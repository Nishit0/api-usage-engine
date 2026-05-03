import { logUsage } from "../services/usage.service.js";

export const usageLogger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    try {
      await logUsage({
        user: req.apiKey.user,
        apiKey: req.apiKey.key,
        endpoint: req.originalUrl,
        method: req.method,
        status: res.statusCode,
        responseTime: Date.now() - start
      });
    } catch (err) {
      console.error("Usage logging failed:", err.message);
    }
  });

  next();
};
