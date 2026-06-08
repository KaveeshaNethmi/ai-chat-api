import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { generateResponse, generateTitle } from "./openai.service.js";

export const chatWithAI = async ({ conversationId, userId, userMessage }) => {
  console.log("conversation iD in service", conversationId);
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found!");
  }

  // 1. Save user message
  await Message.create({
    conversationId,
    role: "user",
    content: userMessage,
  });

  // 2. Check message count
  const messageCount = await Message.countDocuments({
    conversationId,
  });

  // 3. Auto-generate title (FIRST MESSAGE ONLY)
  if (messageCount === 1) {
    const title = await generateTitle(userMessage);
    console.log("title", title);

    await Conversation.findByIdAndUpdate(conversationId, { title });
  }

  // 4. Load last messages (context limit)
  const history = await Message.find({
    conversationId,
  })
    .sort({ createdAt: -1 })
    .limit(20);

  history.reverse();

  const messages = [
    {
      role: "system",
      content: "You are a helpful AI assistant.",
    },
    ...history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  // 5. Call OpenAI
  const aiResponse = await generateResponse(messages);

  // 6. Save assistant message
  await Message.create({
    conversationId,
    role: "assistant",
    content: aiResponse.content,
    tokenUsage: aiResponse.usage,
  });

  return {
    response: aiResponse.content,
    usage: aiResponse.usage,
  };
};
