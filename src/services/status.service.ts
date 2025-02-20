import Status from '../models/status.model'
import redis from '../config/redis';

export const CreateStatusService = async (userId: string, content: string, type: "text" | "image" | "video")=> {
      const status = new Status({
          userId: userId,
          content: content,
          type: type
      });
      return await status.save();
}

export const getStatusService = async (userId: string, page: number = 1, limit: number = 15) => {
   try{
       const cacheKey = `Statuses:${userId}:page:${page}`;

       const cachedData = await redis.get(cacheKey);
       if (cachedData) {
           console.log("⚡ Returning cached statuses");
           return JSON.parse(cachedData);
       }

       const skip = (page - 1) * limit;
       const statuses = await Status.find({ userId })
           .select("_id type content createdAt")
           .sort({ createdAt: - 1 })
           .skip(skip)
           .limit(limit)
           .lean();

       await redis.set(cacheKey, JSON.stringify(statuses), "EX", 300);
       return statuses;
   } catch (error) {
       console.error("❌ Error fetching statuses:", error);
       throw new Error("Failed to get statuses");
   }
}

export const deleteStatusService = async (statusId: string, userId: string) => {
    const status = await Status.findOneAndDelete({ _id: statusId, userId });

    if (!status) {
        throw new Error("Status not found or unauthorized");
    }

    // Clear Redis cache after deletion
    const cacheKey = `user_statuses:${userId}`;
    await redis.del(cacheKey);

    return status;
};
