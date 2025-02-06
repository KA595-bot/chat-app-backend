import { Request, Response } from "express";
import { reportUserService } from "../services/report.service";

export const reportUser = async (req: Request, res: Response) => {
    console.log("reported user", req.body);
    try{
        const { reporterId, reportedUser, reason } = req.body;
        const report = await reportUserService(reporterId, reportedUser, reason);
        res.status(201).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: (error as Error).message });
    }
}