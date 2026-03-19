import { Router } from 'express';
import { onboardStartup, generateTask } from '../controllers/startupController';
import { verifyAuth } from '../middleware/authMiddleware';

const router = Router();

// Apply the verifyAuth middleware to protect this route
router.post('/onboard', verifyAuth, onboardStartup);
router.post('/task/generate', verifyAuth, generateTask);

export default router;
