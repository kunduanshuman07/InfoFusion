import { Router } from 'express';
import { quizAddByAdmin, latestQuiz } from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/quiz-add-admin', quizAddByAdmin);
router.get('/latest-quiz', latestQuiz);
export default router;