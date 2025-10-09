import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
  name: { type: String, required: true }, // room name
  description: { type: String },
  isGroup: { type: Boolean, default: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);
