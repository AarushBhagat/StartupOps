import { Router } from 'express';
import { onboardStartup, generateTask } from '../controllers/startupController';
import { sendInvite, joinWithInvite } from '../controllers/inviteController';
import { verifyAuth } from '../middleware/authMiddleware';

const router = Router();

// Apply the verifyAuth middleware to protect this route
router.post('/onboard', verifyAuth, onboardStartup);
router.post('/task/generate', verifyAuth, generateTask);
router.post('/invite', verifyAuth, sendInvite);
router.post('/join', verifyAuth, joinWithInvite);

export default router;
