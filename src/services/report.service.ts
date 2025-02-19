import Report from '../models/report.model';
import User from '../models/user.model';

const REPORT_THRESHOLD = 5;

export const reportUserService = async (reporterId: string, reportedUserId: string, reason: string) => {
    const existingReport = await Report.findOne({ reporter: reporterId, reportedUser: reportedUserId });

    if (existingReport) {
        throw new Error("You have already reported this user.");
    }

    const report = new Report({ reporter: reporterId, reportedUser: reportedUserId, reason });
    await report.save();

    const updatedUser = await User.findOneAndUpdate(
        { _id: reportedUserId },
        { $inc: {reportThreshold: 1 } },
        {new: true}
    )

    if (updatedUser && updatedUser.reportThreshold >= REPORT_THRESHOLD) {
        updatedUser.isActive = false;
        await updatedUser.save();
        console.log(`User ${reportedUserId} has been deactivated due to reaching the report threshold.`);
    }

    return report;

}


