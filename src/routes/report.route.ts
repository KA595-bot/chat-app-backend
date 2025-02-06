import { Router } from 'express';
import { reportUser } from "../controllers/report.controller";
import { validateDTO } from "../middlewares/validators";
import { ReportDTO } from "../dtos/report.dto";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.post('/reportUser/', authenticateToken, validateDTO(ReportDTO),  reportUser);

export default router;

