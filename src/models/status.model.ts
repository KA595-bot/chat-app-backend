import mongoose, { Schema, Document } from 'mongoose';


export interface IStatus extends Document {
    userId: string; // ID of the user posting the status
    type: 'text' | 'image' | 'video'; // Type of status
    content: string; // Text content or file path/URL for images/videos
    createdAt: Date; // Timestamp of the status
}

const StatusSchema: Schema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, enum: ['text', 'image', 'video'], required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IStatus>("Status", StatusSchema);