import express from 'express';
import { AdminController } from '../controllers/admin.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { requireAdmin } from '../middleware/auth.middleware.js';


const router = express.Router()

router.use(protectRoute, requireAdmin)

router.post('/songs', AdminController.createSong)
router.delete('/songs/:id', AdminController.deleteSong)

router.post('/album/', AdminController.createAlbum)
router.delete('/album/:id', AdminController.deleteSong)

export default router;