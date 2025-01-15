import express from "express";
import http from "http";
import { Server } from "socket.io";
import { io as ClientIO } from "socket.io-client"; // Import socket.io-client
import dotenv from "dotenv";
import connectDB from "./config/database";
import configureSocket from "./utils/socket.util";
import authRoute from "./routes/auth.route";
import chatRoute from "./routes/chat.route";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/chat", chatRoute);

configureSocket(io);

// Simulated client connection for testing
const socket = ClientIO("http://localhost:5173", { transports: ["websocket"] });

socket.on("connect", () => {
    console.log("Simulated client connected to server");
    socket.emit("send message", {
        sender: "Client123",
        receiver: "Receiver456",
        content: "Hello from client simulation!",
    });
});

socket.on("receive message", (data) => {
    console.log("Simulated client received message:", data);
});

socket.on("disconnect", () => {
    console.log("Simulated client disconnected from server");
});

const PORT = process.env.PORT || 5173;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
