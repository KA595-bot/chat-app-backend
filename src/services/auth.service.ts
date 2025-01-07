import User from "../models/user.model"
import { hashPassword, comparePassword } from "../utils/password.util";
import jwt from "jsonwebtoken";

export const registerUserService = async (username: string, password: string, email: string) => {
    const hashedPassword = await hashPassword(password);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    return user;
}

export const loginUserService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User does not exist");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "secret", { expiresIn: "5h" });
    return token;
}