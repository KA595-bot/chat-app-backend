import { Router } from "express";
import { sendMessages, getMessages } from "../controllers/chat.controller";
import { MessageDTO } from "../dtos/chat.dto";
import { validateDTO } from "../middlewares/validators";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post('/messages', authenticateToken, validateDTO(MessageDTO), sendMessages);
router.get('/:senderId/:receiverId', authenticateToken, getMessages);

export default router;