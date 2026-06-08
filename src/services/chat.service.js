import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { generateResponse } from "./openai.service.js";

export const chatWithAI = async ({ conversationId, userMessage, userId }) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found!");
  }

  await Message.create({
    conversationId,
    role: "user",
    content: userMessage,
  });

  const history = await Message.find({
    conversationId,
  }).sort({ createdAt: 1 });

  const message = [
    {
      role: "system",
      content: "You are a helpful AI tutor.",
    },

    ...history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  const aiResponse = await generateResponse(message);

  await Message.create({
    conversationId,
    role: "assistant",
    content: aiResponse.content,
  });

  return {
    response: aiResponse.content,
    usage: aiResponse.usage,
  };
};
