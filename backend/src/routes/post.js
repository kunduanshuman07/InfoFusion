import { Router } from 'express';
import { createPost, getPosts, upload } from '../controllers/postController.js';

const router = Router();

router.post('/create-post',upload.single('file'), createPost);
router.get('/get-posts', getPosts);

export default router;