import { chatWithAI } from "../services/chat.service.js";

export const chatController = async (req, res, next) => {
  try {
    const result = await chatWithAI({
      conversationId: req.body.conversationId,
      userMessage: req.body.message,
    });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
