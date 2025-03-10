import express from 'express'
import { AuthController } from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/callback', AuthController.authCallBack)

export default router;