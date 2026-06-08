import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const createConversation = async ( userId, title ) => {
  const conversation = await Conversation.create({
    userId,
    title,
  });

  return conversation;
};

export const getConversations = async (userId) => {
  return await Conversation.find({
    userId,
  }).sort({
    updatedAt: -1,
  });
};

export const getConversationById = async ({ conversationId, userId }) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  const messages = await Message.find({
    conversationId,
  }).sort({
    createdAt: 1,
  });

  return {
    conversation,
    messages,
  };
};

export const deleteConversation = async ({ conversationId, userId }) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  await Message.deleteMany({
    conversationId,
  });

  await Conversation.deleteOne({
    _id: conversationId,
  });

  return {
    message: "Conversation deleted successfully",
  };
};
