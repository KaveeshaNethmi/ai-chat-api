import Redis from "ioredis";
import { config } from "./config.js";

const redis = new Redis(config.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis connected!");
});

redis.on("error", (err) => {
  console.log("Redis error:", err);
});

export default redis;
