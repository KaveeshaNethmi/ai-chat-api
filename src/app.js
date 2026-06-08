import express from "express";
import chatRoutes from "./routes/chat.routes.js";
import authRoutes from "./routes/auth.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

const app = express();

app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/auth", authRoutes);
app.use("/conversations", conversationRoutes);

export default app;
