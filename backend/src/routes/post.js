import { Router } from 'express';
import { createPost, getPosts, postOpinion, getSinglePost, deleteOpinion } from '../controllers/postController.js';
const router = Router();

router.get('/get-posts', getPosts);
router.post('/get-single-post', getSinglePost);
router.post('/create-post', createPost);
router.patch('/post-opinion', postOpinion);
router.post('/delete-opinion', deleteOpinion);
export default router;