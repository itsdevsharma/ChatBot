import { Conversation } from "../models/conversation.model.js";

export const createConversation = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      });
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: "Error creating conversation", error });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const conversations = await Conversation.find({ participants: userId }).populate("participants");
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching conversations", error });
  }
};
