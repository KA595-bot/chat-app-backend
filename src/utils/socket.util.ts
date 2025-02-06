import { Server } from "socket.io";

const configureSocket = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id );

        // join a room based on user ID
        socket.on("join room", (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room.`);
        })

        socket.on("send message", (data) => {
            const { receiver, content } = data;
            io.to(data.receiver).emit("receive message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
}

export default configureSocket;