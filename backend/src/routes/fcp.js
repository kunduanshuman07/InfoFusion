import { Router } from 'express';
import { factCheck, upload } from '../controllers/fcpController.js';
const router = Router();

router.post('/fake-news-detect', upload.single('file'), factCheck);

export default router;