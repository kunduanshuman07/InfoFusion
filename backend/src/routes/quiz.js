import { Router } from 'express';
import { quizAddByAdmin } from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/quiz-add-admin', quizAddByAdmin);

export default router;