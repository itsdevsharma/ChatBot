import { Message } from "../models/messages.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, text } = req.body;
    const message = await Message.create({ conversation: conversationId, sender: senderId, text });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error sending message", error });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId }).populate("sender", "username email");
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages", error });
  }
};
