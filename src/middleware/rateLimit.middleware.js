import { randomUUID } from "crypto";
import { redis } from "../config/redis.js";

const rateLimitScript = `
local key = KEYS[1]
local windowMs = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])
local member = ARGV[3]

local time = redis.call("TIME")
local nowMs = (tonumber(time[1]) * 1000) + math.floor(tonumber(time[2]) / 1000)
local windowStart = nowMs - windowMs

redis.call("ZREMRANGEBYSCORE", key, 0, windowStart)

local current = redis.call("ZCARD", key)

if current >= limit then
  local oldest = redis.call("ZRANGE", key, 0, 0, "WITHSCORES")
  local resetAfterMs = windowMs

  if oldest[2] then
    resetAfterMs = math.max(windowMs - (nowMs - tonumber(oldest[2])), 0)
  end

  return {0, 0, resetAfterMs}
end

redis.call("ZADD", key, nowMs, member)
redis.call("PEXPIRE", key, windowMs)

return {1, limit - current - 1, windowMs}
`;

export const rateLimiter = async (req, res, next) => {
  try {
    const key = req.apiKey.key;
    const windowMs = req.apiKey.rateLimit.window * 1000;
    const limit = req.apiKey.rateLimit.limit;
    const redisKey = `rate_limit:${key}`;
    const member = `${Date.now()}:${randomUUID()}`;

    const [allowed, remaining, resetAfterMs] = await redis.eval(
      rateLimitScript,
      1,
      redisKey,
      windowMs,
      limit,
      member
    );

    res.set("X-RateLimit-Limit", String(limit));
    res.set("X-RateLimit-Remaining", String(remaining));
    res.set("X-RateLimit-Reset", String(Math.ceil(resetAfterMs / 1000)));

    if (!allowed) {
      return res.status(429).json({ message: "Rate limit exceeded" });
    }

    next();
  } catch (err) {
    next(err);
  }
};
