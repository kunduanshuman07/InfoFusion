import { Router } from 'express';
import { createPost, dislikePost, getPosts, likePost, postcomment, upload } from '../controllers/postController.js';

const router = Router();

router.post('/create-post',upload.single('file'), createPost);
router.post('/get-posts', getPosts);
router.post('/like-post', likePost);
router.post('/dislike-post', dislikePost);
router.post('/post-comment', postcomment);
export default router;