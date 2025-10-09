import express from "express";
import { getUsers, login, register } from "../controllers/user.controller.js";

const router = express.Router();


//register a user
router.post("/register", register);
router.post("/login", login);
router.get("/", getUsers);

export default router;