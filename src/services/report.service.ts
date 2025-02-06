import Report from '../models/report.model';

export const reportUserService = async (reporterId: string, reportedUser: string, reason: string) => {
    const report = new Report({ reporter: reporterId, reportedUser: reportedUser, reason });
    return await report.save();
}
