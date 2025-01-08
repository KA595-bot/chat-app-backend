import Message from '../models/message.model';

export const sendMessageService = async (sender: string, receiver: string, content: string, type?: string) => {
    const message = new Message({ sender, receiver, content, type });
    return await message.save();
}
export const fetchMessages = async (senderId: string, receiverId: string) => {
    return Message.find({
        $or: [
            { sender: senderId, receiver: receiverId },
            { sender: receiverId, receiver: senderId }
        ]
    }).sort({ timestamp: 1 });
};