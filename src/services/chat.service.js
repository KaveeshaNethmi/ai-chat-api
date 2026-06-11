import redis from "../config/redis.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import {
  generateResponse,
  generateStreamingResponse,
  generateTitle,
} from "./openai.service.js";

// Helper function to get the conversation history
const getConversationHistory = async (conversationId) => {
  const cacheKey = `conversation:${conversationId}:messages`;

  let history = await redis.get(cacheKey);

  if (history) {
    console.log("CACHE HIT");
    return JSON.parse(history);
  }

  console.log("CACHE MISS");

  history = await Message.find({
    conversationId,
  })
    .sort({ createdAt: 1 })
    .limit(20);

  await redis.set(cacheKey, JSON.stringify(history), "EX", 60 * 60);

  return history;
};

// Helper function to clear the cache
const invalidateConversationCache = async (conversationId) => {
  await redis.del(`conversation:${conversationId}:messages`);
};

// Main Chat API service
export const chatWithAI = async ({ conversationId, userId, userMessage }) => {
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

  // 2. Clear cache
  await invalidateConversationCache(conversationId);

  // 3. Generate title only once
  if (conversation.title === "New Chat") {
    const title = await generateTitle(userMessage);
    await Conversation.findByIdAndUpdate(conversationId, { title });
  }

  // 4. Load conversation history
  const history = await getConversationHistory(conversationId);

  // 5. Build OpenAI messages
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

  // 6. Generate AI response
  const aiResponse = await generateResponse(messages);

  // 7. Save assistant response
  await Message.create({
    conversationId,
    role: "assistant",
    content: aiResponse.content,
    tokenUsage: {
      promptTokens: aiResponse.usage?.prompt_tokens,
      completionTokens: aiResponse.usage?.completion_tokens,
      totalTokens: aiResponse.usage?.total_tokens,
    },
  });

  // 8. Clear cache again
  await invalidateConversationCache(conversationId);

  return {
    response: aiResponse.content,
    usage: aiResponse.usage,
  };
};

// Chat API service with streaming
export const streamChatWithAI = async ({
  conversationId,
  userId,
  userMessage,
  res,
}) => {
  const conversation = await Conversation.findOne({
    _id: conversationId,
    userId,
  });

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  await Message.create({
    conversationId,
    role: "user",
    content: userMessage,
  });

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

  const stream = await generateStreamingResponse(messages);

  let fullResponse = "";

  for await (const chunk of stream) {
    const content = chunk.choices?.[0]?.delta?.content || "";

    if (!content) continue;

    fullResponse += content;

    res.write(
      `data: ${JSON.stringify({
        content,
      })}\n\n`,
    );
  }

  await Message.create({
    conversationId,
    role: "assistant",
    content: fullResponse,
  });

  res.write(
    `data: ${JSON.stringify({
      done: true,
    })}\n\n`,
  );

  res.end();
};
