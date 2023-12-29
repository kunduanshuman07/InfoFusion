import { Router } from 'express';
import { createPost, getPosts, postOpinion } from '../controllers/postController.js';
const router = Router();

router.get('/get-posts', getPosts);
router.post('/create-post', createPost);
router.patch('/post-opinion', postOpinion);
export default router;