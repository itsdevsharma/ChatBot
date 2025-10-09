import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation" },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: { type: String, required: true }, // Text message
    media: { type: String }, // URL to any media (e.g., image/video)
    timestamp: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    }, // Message status
  },
  {
    timestamps: true,
  }
);

export const Message = mongoose.model("Message", messageSchema);
