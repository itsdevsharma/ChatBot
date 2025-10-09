import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { initSocket } from "./socket/socket.js";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server);
initSocket(io);

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json({limit : "20Kb"}));
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

//import Route
import userRoutes from "./routes/user.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";
import messageRoutes from "./routes/messages.routes.js";
import chatRoomRoutes from './routes/chatRoom.routes.js'
import mediaRoutes from './routes/media.routes.js'


//Declare Route
app.use("/api/users", userRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/chatrooms", chatRoomRoutes);
app.use("/api/media", mediaRoutes);



export {app, server}

