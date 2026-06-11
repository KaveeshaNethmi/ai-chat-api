import OpenAI from "openai";
import dotenv from "dotenv";
import { config } from "../config/config.js";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export const generateResponse = async (messages) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
  });

  return {
    content: response.choices[0].message.content,
    usage: response.usage,
  };
};

// OpeneAI service with streaming -> creting a seperate service 
export const generateStreamingResponse = async (
  messages
) => {
  return await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages,
    stream: true,
  });
};

// Generate title of the chat
export const generateTitle = async (message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "Generate a short conversation title (max 5-7 words). No quotes",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return response.choices[0].message.content;
};