import { Request, Response } from "express";
import { CreateStatusService } from "../services/status.service";

export const CreateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, type } = req.body;
        let content = req.body.content;

        // Validate required fields
        if (!userId || !type) {
            res.status(400).json({ error: "Missing required fields: userId or type" });
            return;
        }

        // Validate type field
        if (!["text", "image", "video"].includes(type)) {
            res.status(400).json({ error: "Invalid type. Allowed values: text, image, video" });
            return;
        }

        // Handle file upload for images and videos
        if (type === "image" || type === "video") {
            if (!req.file) {
                res.status(400).json({ error: "File not uploaded" });
                return;
            }

            content = req.file.path; // Save the file path
        } else {
            // Handle text status
            if (!content) {
                res.status(400).json({ error: "Content is required for text status" });
                return;
            }
        }

        // Create the status
        const status = await CreateStatusService(userId, content, type);
        res.status(201).json({ message: "Status published successfully", status });
    } catch (error) {
        console.error("Error publishing status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
