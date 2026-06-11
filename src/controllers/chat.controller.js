import { chatWithAI, streamChatWithAI } from "../services/chat.service.js";

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


export const streamChatController =
  async (req, res) => {
    try {
      res.setHeader(
        "Content-Type",
        "text/event-stream"
      );

      res.setHeader(
        "Cache-Control",
        "no-cache"
      );

      res.setHeader(
        "Connection",
        "keep-alive"
      );

      await streamChatWithAI({
        conversationId:
          req.body.conversationId,
        userId:
          req.user._id,
        userMessage:
          req.body.message,
        res,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          error.message,
      });
    }
  };