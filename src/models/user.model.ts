import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    _id: Schema.Types.ObjectId;
    telephone: string;
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
});

export default mongoose.model<IUser>("User", UserSchema);

