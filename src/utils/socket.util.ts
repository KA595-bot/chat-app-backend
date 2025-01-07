import { Server } from "socket.io";

const configureSocket = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("New user connected:", socket.id );

        socket.on("send message", (data) => {
            io.to(data.receiver).emit("receive message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id);
        });
    });
}

export default configureSocket;