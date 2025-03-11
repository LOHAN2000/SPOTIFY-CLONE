import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { UserController } from '../controllers/user.controller.js';

const router = express.Router()

router.get('/', protectRoute, UserController.getAllUsers);



export default router;