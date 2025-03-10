import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/auth.middleware.js';


const router = express.Router()

router.get('/songs', protectRoute, requireAdmin, AdminController.createSong)

export default router;