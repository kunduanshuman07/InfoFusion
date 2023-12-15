import { Router } from 'express';
import { updateProfile, getOverallLeaderboard, userDashboard } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.patch('/update-profile', updateProfile);
router.get('/overall-leaderboard', getOverallLeaderboard);
router.post('/user-dashboard', userDashboard);
export default router;