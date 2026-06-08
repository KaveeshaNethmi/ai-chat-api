import express from "express";

import {
  createConversationController,
  getConversationsController,
  getConversationController,
  deleteConversationController,
} from "../controllers/conversation.controller.js";
import checkUserAuthentication from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  checkUserAuthentication,
  createConversationController
);

router.get(
  "/",
  checkUserAuthentication,
  getConversationsController
);

router.get(
  "/:id",
  checkUserAuthentication,
  getConversationController
);

router.delete(
  "/:id",
  checkUserAuthentication,
  deleteConversationController
);

export default router;