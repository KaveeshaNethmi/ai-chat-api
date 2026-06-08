import express from "express";
import { chatController } from "../controllers/chat.controller.js";
import checkUserAuthentication from "../middlewares/auth.middleware.js";

const chatRouter = express.Router();

chatRouter.post(
    "/",
    checkUserAuthentication,
    chatController
);

export default chatRouter;
