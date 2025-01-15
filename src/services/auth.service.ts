import User from "../models/user.model"
import { hashPassword, comparePassword } from "../utils/password.util";
import {  generateAccessToken, generateRefreshToken } from "../utils/token.util";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

export const registerUserService = async (username: string, password: string, email: string, telephone: string) => {
    const hashedPassword = await hashPassword(password);

    const user = new User({ username, password: hashedPassword, email, telephone });
    await user.save();

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    const userWithoutPassword = {
        ...user.toObject(),
        password: undefined,
    };

    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const loginUserService = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User does not exist");
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }

    const userWithoutPassword = {
        ...user.toObject(),
        password: undefined,
    };

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return { user: userWithoutPassword, accessToken, refreshToken };
};

export const requestPasswordReset = async (email: string) => {
         const user  = await User.findOne({ email });

         if (!user) {
             throw new Error("User does not exist");
         }

        const token = generateAccessToken(user._id.toString());
         user.resetPasswordToken = token;

         user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
         await user.save();

         const resetLink = `http://localhost:5173/api/auth/reset-password/${token}`;

         const transporter = nodemailer.createTransport({
             service: 'gmail',
             auth: {
                 user: 'kahzejulius@gmail.com',
                 pass: 'xlwx utmf lebs ywbc',
             }
         });


    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           ${resetLink}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
}

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    // Ensure newPassword is a string
    const passwordString = newPassword.toString();

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
        throw new Error('Password reset token is invalid or has expired');
    }

    const isSamePassword = await comparePassword(passwordString, user.password);
    if (isSamePassword) {
        throw new Error('New password must be different from the current password');
    }

    user.password = await hashPassword(passwordString);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
};

