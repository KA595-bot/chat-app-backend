import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import connectDB from "./config/database";
import configureSocket from "./utils/socket.util";
import authRoute from "./routes/auth.route";
import chatRoute from "./routes/chat.route";
import groupRoute from "./routes/group.route";
import reportRoute from "./routes/report.route";
import statusRoute from "./routes/status.route";
import '../src/jobs/deleteExpiredStatuses';

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.json());
app.use('uploads/', express.static('uploads'));
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/group", groupRoute);
app.use("/api/report", reportRoute);
app.use("/api/status", statusRoute);

configureSocket(io);

const PORT = process.env.PORT || 5173;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
