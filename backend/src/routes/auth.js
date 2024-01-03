import { Router } from 'express';
import { register, login, updatePassword } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/update-password', updatePassword);
export default router;