import { chatWithAI } from "../services/chat.service.js";

export const chatController = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await chatWithAI({
      conversationId: req.body.conversationId,
      userId: req.user._id,
      userMessage: req.body.message,
    });
    
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
