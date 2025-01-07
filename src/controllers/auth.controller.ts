import { Request, Response, NextFunction } from "express";
import { registerUserService, loginUserService } from "../services/auth.service";

export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { username, password, email } = req.body;
        const user = await registerUserService(username, password, email);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        const token = await loginUserService(email, password);

        res.status(200).json({ token });
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
