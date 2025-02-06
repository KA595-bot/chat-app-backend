import mongoose, { Schema, Document } from "mongoose";

export interface IGroup extends Document {
    name: string;
    description?: string;
    admin: mongoose.Types.ObjectId;
    members: { user: mongoose.Types.ObjectId; role: "admin" | "member"}[];
    createdAt: Date;
}

const GroupSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ user: { type: Schema.Types.ObjectId, ref: "User"}, role: { type: String, enum: ["admin", "member"], default: "member" } },],
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGroup>("Group", GroupSchema);



