import {
  createConversation,
  getConversations,
  getConversationById,
  deleteConversation,
} from "../services/conversation.service.js";

export const createConversationController = async (req, res, next) => {
  try {
    const { userId, title } = req.body;
    const conversation = await createConversation(userId, title);

    return res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

export const getConversationsController = async (req, res, next) => {
  try {
    const conversations = await getConversations(req.user.userId);

    return res.json(conversations);
  } catch (error) {
    next(error);
  }
};

export const getConversationController = async (req, res, next) => {
  try {
    const data = await getConversationById({
      conversationId: req.params.id,
      userId: req.user.userId,
    });

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteConversationController = async (req, res, next) => {
  try {
    const result = await deleteConversation({
      conversationId: req.params.id,
      userId: req.user.userId,
    });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};
