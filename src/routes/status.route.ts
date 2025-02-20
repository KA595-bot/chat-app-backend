import express from 'express';
import { CreateStatus, getUserStatuses, deleteUserStatus } from '../controllers/status.controller';
import { upload } from '../utils/multerConfig';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/postStatus', authenticateToken, upload.single('file'), CreateStatus);
router.get('/user/:userId/statuses', authenticateToken, getUserStatuses);
router.delete('/user/:statusId', authenticateToken, deleteUserStatus);

export default router;