import cron from 'node-cron';
import StatusModel from "../models/status.model";
import fs from 'fs';

cron.schedule("0 * * * *", async () => {
    try {
        const now = new Date();
        const expiredStatuses = await StatusModel.find({
            createdAt: { $lt: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
        });

        for (const status of expiredStatuses) {
            if (status.type !== "text") {
                fs.unlink(status.content, (err) => {
                    if (err) console.error("Error deleting file:", err);
                });
            }
            await StatusModel.deleteOne({ _id: status._id });
        }

        console.log("Expired statuses deleted.");
    } catch (error) {
        console.error("Error deleting statuses:", error);
    }
});