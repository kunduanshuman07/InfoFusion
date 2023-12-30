import { Router } from 'express';
import { updateProfile, getOverallLeaderboard, userDashboard, deleteAccount, userDetails } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.patch('/update-profile', updateProfile);
router.delete('/delete-account/:userid', deleteAccount);
router.get('/overall-leaderboard', getOverallLeaderboard);
router.post('/user-dashboard', userDashboard);
router.post('/user-details', userDetails);

export default router;