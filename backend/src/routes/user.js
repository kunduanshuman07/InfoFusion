import { Router } from 'express';
import { updateProfile } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.patch('/update-profile', updateProfile);

export default router;