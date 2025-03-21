import express from 'express';
import { SongController } from '../controllers/song.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/auth.middleware.js';
import { AdminController } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/', protectRoute, requireAdmin, SongController.getAllSongs);
router.get('/featured', SongController.getFeaturedSongs);
router.get('/made-for-you', SongController.getMadeForYou);
router.get('/trending', SongController.getTrendingSongs);


export default router;