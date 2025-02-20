import express from 'express';
import { CreateStatus } from '../controllers/status.controller';
import { upload } from '../utils/multerConfig';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

// Apply the upload middleware for image/video statuses
router.post('/postStatus', authenticateToken, upload.single('file'), CreateStatus);

export default router;