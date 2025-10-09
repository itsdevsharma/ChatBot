import { ChatRoom } from "../models/chatRoom.model.js";

export const createRoom = async (req, res) => {
  try {
    const { name, description, members, admins } = req.body;

    const room = await ChatRoom.create({
      name,
      description,
      members,
      admins
    });

    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error creating room", error });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await ChatRoom.find().populate("members admins", "username email");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoom.findById(roomId).populate("members admins", "username email");

    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error fetching room", error });
  }
};

export const addMember = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId } = req.body;

    const room = await ChatRoom.findByIdAndUpdate(
      roomId,
      { $addToSet: { members: userId } },
      { new: true }
    );

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Error adding member", error });
  }
};
