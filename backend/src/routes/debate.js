import { Router } from 'express';
import { addDebateTopics, getAllDebates, getAllPinnedStatements, getDebate, joinDebateAgainst, joinDebateInFavor, pinStatementAgainst, pinStatementInFavor} from '../controllers/debateController.js';
const router = Router();

router.post('/add-debate-topic', addDebateTopics);
router.get('/all-debates', getAllDebates);
router.post('/get-debate',getDebate);
router.post('/join-debate-infavor', joinDebateInFavor);
router.post('/join-debate-against', joinDebateAgainst);
router.post('/pinstatement-infavor', pinStatementInFavor);
router.post('/pinstatement-against', pinStatementAgainst);
router.post('/getall-pinned-statements', getAllPinnedStatements);
export default router;