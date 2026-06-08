import rateLimit from "express-rate-limit";

const chatLimiter = rateLimit({
  windowMs: 60 * 100, // 1 minute
  max: 10,
  message: {
    message: "Too many requests!",
  },
});

export default chatLimiter;
