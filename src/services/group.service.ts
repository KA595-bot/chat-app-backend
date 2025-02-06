import Group from "../models/group.model"
import mongoose from "mongoose";

export const createGroupService = async (name: string, description: string, adminId: string)=> {
    const group = new Group({
        name,
        description,
        admin: new mongoose.Types.ObjectId(adminId),
        members: [{ user: new mongoose.Types.ObjectId(adminId), role: "admin" }],
    });
    return await group.save();
}

export const addMemberService = async (groupId: string, adminId: string, memberId: string) => {
    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error("Group Not found");
    }

    const isAdmin = group.members.some(m => m.user.toString() === adminId && m.role === "admin");
    if (!isAdmin) {
        throw new Error("only admins can add members to this group");
    }

    const isUserExist = group.members.find(m => m.user.toString() === memberId);
    if (isUserExist) {
        throw new Error("User already exists");
    }

    group.members.push({ user: new mongoose.Types.ObjectId(memberId), role: "member" });
    return await group.save();
}

export const changeRoleService = async (groupId: string, adminId: string, memberId: string, newRole: "admin" | "member") => {
      const group = await Group.findById(groupId);
      if (!group) {
          throw new Error("Group Not found");
      }

      const isAdmin = group.members.some(m => m.user.toString() === adminId && m.role === "admin");
      if (!isAdmin) {
          throw new Error("only admins can change roles");
      }

      const member = group.members.find(m => m.user.toString() === memberId);
      if (!member) {
          throw new Error("Member Not found in group");
      }

      member.role = newRole;
      return await group.save();
}