import { Request, Response, NextFunction } from "express";
import { sendMessageService, fetchMessages } from "../services/chat.service";

export const sendMessages = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { sender, receiver, content, type, chatMessage } = req.body;
        const message = await sendMessageService(sender, receiver, content, type, chatMessage);
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
    try {
        const messages = await fetchMessages(senderId, receiverId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};
