import { Router } from 'express';
import { updateProfile, getOverallLeaderboard, userDashboard, deleteAccount, userDetails, uploadUserImage, upload, getUserScorecards, getAllUsers, getMyConnections, getRequestedConnections, getConnectionRequests, sendConnectionRequests, approveConnectionRequests, deleteConnectionRequests, getIFNetwork, fetchMessages, sendMessage, fetchAllMessages, fetchNotifications, } from '../controllers/userController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = Router();

router.patch('/update-profile/:userid', updateProfile);
router.patch('/upload-image',upload.single('file'), uploadUserImage);
router.delete('/delete-account/:userid', deleteAccount);
router.get('/overall-leaderboard', getOverallLeaderboard);
router.post('/user-dashboard', userDashboard);
router.post('/user-details', userDetails);
router.get('/all-users', getAllUsers);
router.post('/get-if-network', getIFNetwork);
router.post('/my-connections',getMyConnections)
router.post('/requested-connections',getRequestedConnections)
router.post('/connection-requests',getConnectionRequests)
router.post('/send-connection-request', sendConnectionRequests);
router.post('/approve-connection-request', approveConnectionRequests);
router.post('/delete-connection-request', deleteConnectionRequests);
router.post('/user-scorecards', getUserScorecards);
router.post('/fetch-messages', fetchMessages);
router.post('/fetch-all-messages', fetchAllMessages);
router.post('/send-message', sendMessage);
router.post('/fetch-notifications', fetchNotifications);

export default router;