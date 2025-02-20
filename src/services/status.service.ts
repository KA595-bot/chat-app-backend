import Status from '../models/status.model'

export const CreateStatusService = async (userId: string, content: string, type: "text" | "image" | "video")=> {
      const status = new Status({
          userId: userId,
          content: content,
          type: type
      });
      return await status.save();
}