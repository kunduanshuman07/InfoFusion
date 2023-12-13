import { Router } from 'express';
import { quizAddByAdmin, latestQuiz, updateUserQuizData } from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/quiz-add-admin', quizAddByAdmin);
router.get('/latest-quiz', latestQuiz);
router.patch('/update-user-quiz-data', updateUserQuizData);
export default router;