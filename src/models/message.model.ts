import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
    sender: mongoose.Types.ObjectId;
    receiver: mongoose.Types.ObjectId;
    chatMessage: string;
    content: string;
    type: "text" | "file";
    timestamp: Date;
}

const MessageSchema: Schema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chatMessage: { type: String, required: true },
    content: { type: String },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>("Message", MessageSchema);