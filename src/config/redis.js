import Redis from "ioredis";
import { env } from "./env.js";

const redisOptions = {
  lazyConnect: true,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 1
};

export const redis = env.redis.url ? new Redis(env.redis.url, redisOptions) : new Redis({
  host: env.redis.host,
  port: env.redis.port,
  password: env.redis.password,
  db: env.redis.db,
  ...redisOptions
});

redis.on("error", (err) => {
  console.error("Redis Error:", err.message);
});
