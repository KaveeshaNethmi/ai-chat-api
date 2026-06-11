import express from "express";
import { chatController, streamChatController } from "../controllers/chat.controller.js";
import checkUserAuthentication from "../middlewares/auth.middleware.js";
import chatLimiter from "../middlewares/rateLimit.middleware.js";

const chatRouter = express.Router();

chatRouter.post("/", checkUserAuthentication, chatLimiter, chatController);

chatRouter.post(
  "/stream",
  checkUserAuthentication,
  chatLimiter,
  streamChatController,
);

export default chatRouter;
