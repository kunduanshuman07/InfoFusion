import { Router } from 'express';
import { quizAddByAdmin, latestQuiz, updateUserQuizData, getLeaderBoard, getOverallLeaderboard } from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/quiz-add-admin', quizAddByAdmin);
router.get('/latest-quiz', latestQuiz);
router.patch('/update-user-quiz-data', updateUserQuizData);
router.post('/get-leaderboard', getLeaderBoard)
router.get('/overall-leaderboard', getOverallLeaderboard);
export default router;