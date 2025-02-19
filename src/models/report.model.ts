import mongoose, { Schema, Document } from "mongoose";

export interface IReport extends Document {
    reporter: Schema.Types.ObjectId;
    reportedUser: Schema.Types.ObjectId;
    reason: string;
    createdAt: Date
}

const ReportSchema: Schema = new Schema({
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reportedUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})
ReportSchema.index({ reporter: 1, reportedUser: 1 }, { unique: true });
export default mongoose.model<IReport>("Report", ReportSchema)