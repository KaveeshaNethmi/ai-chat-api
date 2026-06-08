import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Conversation = mongoose.model(
    "Conversation",
    conversationSchema
);
export default Conversation;
