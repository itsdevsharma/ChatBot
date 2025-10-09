import { Media } from "../models/media.model.js";

export const uploadMedia = async (req, res) => {
  try {
    const { messageId, url, type, size } = req.body;

    const media = await Media.create({
      message: messageId,
      url,
      type,
      size
    });

    res.status(201).json(media);
  } catch (error) {
    res.status(500).json({ message: "Error uploading media", error });
  }
};

export const getMediaByMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const mediaFiles = await Media.find({ message: messageId });
    res.json(mediaFiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching media", error });
  }
};
