import { Request, Response, NextFunction } from "express";
import { sendMessageService, fetchMessages } from "../services/chat.service";
import { io } from '../server';
import Message from '../models/message.model'

export const sendMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { sender, receiver, content, type, chatMessage } = req.body;
        const message = await sendMessageService(sender, receiver, content, type, chatMessage);
        // Emit a socket.io event to the receiver
        io.to(receiver).emit("message", message);
        res.status(200).json(message);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const getMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { senderId, receiverId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    try {
        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);

        // Fetch messages with pagination
        const messages = await fetchMessages(senderId, receiverId, pageNumber, limitNumber);

        // Get the total number of messages (for pagination metadata)
        const totalMessages = await Message.countDocuments({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        // Calculate total pages
        const totalPages = Math.ceil(totalMessages / limitNumber);

        // Send response with pagination metadata
        res.status(200).json({
            messages,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                totalMessages,
                totalPages
            }
        });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
