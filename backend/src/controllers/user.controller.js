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

  static async getMessages (req, res, next) {
    try {
      const myId = req.auth.userId;
      const { userId } = req.params;

      const sql = `
      SELECT *
      FROM messages
      WHERE (sender_id = ? AND receiver_id = ?)
         OR (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC`;

      const params = [ userId, myId, myId, userId ]
      const [ rows ] = await conn.query(sql, params)

      res.status(200).json(rows);

    } catch (error) {
      next(error);
    }
  }
}