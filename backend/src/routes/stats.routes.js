import express from 'express';
import { StatController } from '../controllers/stat.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = express.Router()

router.get('/', protectRoute, requireAdmin, StatController.getStats);

export default router;