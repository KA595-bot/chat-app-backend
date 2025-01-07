import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/chat-app");
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

export default connectDB;
