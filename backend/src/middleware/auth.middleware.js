import { clerkClient } from '@clerk/express'
import dotenv from 'dotenv'

dotenv.config()

export const protectRoute = async (req, res, next) => {

  if (!req.auth.userId) {
    res.status(401).json({message: 'Unauthroized - You must be logged in'})
    return
  }
  next();
}

export const requireAdmin = async (req, res, next) => {
  try {
    const currenUser = await clerkClient.users.getUser(req.auth.userId);
    const isAdmin = process.env.ADMIN_EMAIL === currenUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res.status(403).json({ message: 'Unauthroized- You mus be an admin'})
    }

    next();

  } catch (error) {
    console.log('Error in requireAdmin function')
    res.status(500).json({message: 'Internal server error', error})
  }
}