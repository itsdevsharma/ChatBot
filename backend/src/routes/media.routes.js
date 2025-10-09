import express from "express";
import { uploadMedia, getMediaByMessage } from "../controllers/media.controller.js";

const router = express.Router();

router.post("/", uploadMedia);
router.get("/:messageId", getMediaByMessage);

export default router;
