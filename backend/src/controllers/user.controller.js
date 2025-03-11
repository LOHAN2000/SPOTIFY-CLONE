import { conn } from "../config/db.js";

export class UserController {
  static async getAllUsers (req, res, next) {
    try {
      const currenUserId = req.auth.userId;
      const [users] = await conn.query('SELECT * FROM users WHERE clerkId <> ?', [currenUserId]);
      
      res.status(200).json(users)
    } catch (error) {
      console.log('Error in getAllUsers', error);
      next(error);
    }
  }
}