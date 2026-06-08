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
