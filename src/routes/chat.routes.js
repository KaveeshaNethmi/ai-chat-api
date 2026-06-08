import express from "express";
import { chatController } from "../controllers/chat.controller.js";
import checkUserAuthentication from "../middlewares/auth.middleware.js";
import chatLimiter from "../middlewares/rateLimit.middleware.js";

const chatRouter = express.Router();

chatRouter.post(
    "/",
    checkUserAuthentication,
    chatLimiter,
    chatController
);

export default chatRouter;
