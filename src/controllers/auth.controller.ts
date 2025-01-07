import { Request, Response, NextFunction } from "express";
import { registerUserService, loginUserService, resetPassword, requestPasswordReset } from "../services/auth.service";
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password, email, telephone } = req.body;
        const { user, accessToken, refreshToken } = await registerUserService(username, password, email, telephone);

        res.status(201).json({
            message: "User registered successfully",
            user,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ error: (error as Error).message });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password, telephone } = req.body;

        const { user, accessToken, refreshToken } = await loginUserService(email, password);

        res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
        const errorMessage = (error as Error).message;
        if (errorMessage === "User not found") {
            res.status(404).json({ error: errorMessage });
            return;
        }
        if (errorMessage === "Invalid credentials") {
            res.status(401).json({ error: errorMessage });
            return;
        }
        res.status(500).json({ error: errorMessage });
    }
};

export const requestPasswordResetController = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const { email } = req.body;
        await requestPasswordReset(email);
        res.status(200).json({ message: 'Password reset link sent' });
    } catch ( error ) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export const resetPasswordController = async ( req: Request, res: Response, next: NextFunction): Promise<void> => {
    try{
        const { token } = req.params;
        const newPassword = req.body;
        await resetPassword(token, newPassword);
        res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
}