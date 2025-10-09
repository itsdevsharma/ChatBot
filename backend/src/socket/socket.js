import { Message } from "../models/messages.model.js";

let io;

export const initSocket = (serverIo) => {
  io = serverIo;

  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);

    // Join a chat room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`📌 User ${socket.id} joined room ${roomId}`);
    });

    // Send a message
    socket.on("sendMessage", async (msgData) => {
      const { conversationId, senderId, text } = msgData;

      // Save to DB
      const message = await Message.create({
        conversation: conversationId,
        sender: senderId,
        text,
      });

      // Broadcast to room
      io.to(conversationId).emit("receiveMessage", message);
    });

    // Typing indicator
    socket.on("typing", (roomId) => {
      socket.to(roomId).emit("typingResponse");
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.id);
    });
  });
};

export const getIo = () => io;
