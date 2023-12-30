import { Router } from 'express';
import { quizAddByAdmin, latestQuiz, updateUserQuizData, getLeaderBoard, getAllPastQuizzes, getQuizData} from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/quiz-add-admin', quizAddByAdmin);
router.get('/latest-quiz', latestQuiz);
router.patch('/update-user-quiz-data', updateUserQuizData);
router.post('/get-leaderboard', getLeaderBoard)
router.get('/getall-quizzes', getAllPastQuizzes);
router.post('/getquizdata', getQuizData);

export default router;