import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    _id: Schema.Types.ObjectId;
    telephone: string;
    isActive: boolean;
    reportThreshold: number;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telephone: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    isActive: { type: Boolean, default: true },
    reportThreshold: { type: Number, default: 0 },
});
UserSchema.index({ reportThreshold: 1 });

export default mongoose.model<IUser>("User", UserSchema);

