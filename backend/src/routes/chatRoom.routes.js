import express from "express";
import { createRoom, getRooms, getRoomById, addMember } from "../controllers/chatRoom.controller.js";

const router = express.Router();

router.post("/", createRoom);
router.get("/", getRooms);
router.get("/:roomId", getRoomById);
router.put("/:roomId/add-member", addMember);

export default router;
