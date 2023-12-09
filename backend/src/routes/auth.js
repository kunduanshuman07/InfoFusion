import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);
export default router;