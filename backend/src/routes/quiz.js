import { Router } from 'express';
import { quizAddByAdmin, latestQuiz, updateUserQuizData, getLeaderBoard, getAllPastQuizzes, getQuizData, rawQuizDetailing} from '../controllers/quizController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.post('/quiz-add-admin', quizAddByAdmin);
router.get('/latest-quiz', latestQuiz);
router.patch('/update-user-quiz-data', updateUserQuizData);
router.post('/get-leaderboard', getLeaderBoard)
router.get('/getall-quizzes', getAllPastQuizzes);
router.post('/getquizdata', getQuizData);
router.post('/count-enability', rawQuizDetailing);
export default router;