import { Request, Response } from 'express';
import { createGroupService, addMemberService, changeRoleService} from "../services/group.service";

export const createGroup = async (req: Request, res: Response) => {
    try{
        const { name, description, adminId } = req.body;
        const group = await createGroupService(name, description, adminId);
        res.status(201).json(group);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export const addMember  = async (req: Request, res: Response) => {
    try{
        const { groupId, adminId, memberId } = req.body;
        const updateGroup = await addMemberService(groupId, adminId, memberId);
        res.status(201).json(updateGroup)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

export const changeRole = async (req: Request, res: Response) => {
      try{
          const { groupId, adminId, memberId, newRole } = req.body;
          const updateGroup = await changeRoleService(groupId, adminId, memberId, newRole);
          res.status(200).json(updateGroup)
      } catch (error) {
          res.status(400).json({ error: (error as Error).message });
      }
}