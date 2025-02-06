import { Router } from 'express';
import { createGroup, addMember, changeRole } from "../controllers/group.controller";
import { GroupDTO } from "../dtos/group.dto";
import { validateDTO } from "../middlewares/validators";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post('/create/', authenticateToken, validateDTO(GroupDTO), createGroup);
router.post('/create/member/', authenticateToken, addMember);
router.post('/changeRole/', authenticateToken, changeRole);

export default router;

