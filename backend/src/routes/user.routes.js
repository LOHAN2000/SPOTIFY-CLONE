import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { UserController } from '../controllers/user.controller.js';
import { clerkClient, createClerkClient } from '@clerk/express';
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

router.get('/', protectRoute, UserController.getAllUsers);

export default router;
