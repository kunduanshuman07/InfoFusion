import { Router } from 'express';
import { updateProfile, getOverallLeaderboard, userDashboard, deleteAccount, userDetails, uploadUserImage, upload, getUserScorecards, } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.patch('/update-profile/:userid', updateProfile);
router.patch('/upload-image',upload.single('file'), uploadUserImage);
router.delete('/delete-account/:userid', deleteAccount);
router.get('/overall-leaderboard', getOverallLeaderboard);
router.post('/user-dashboard', userDashboard);
router.post('/user-details', userDetails);
router.post('/user-scorecards', getUserScorecards);

export default router;