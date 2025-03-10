import { conn } from "../config/db.js";

export class AuthController {
  static async authCallBack (req, res, next) {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;

      const [rows] = await conn.query('SELECT * FROM users WHERE clerkId = ?', [id])

      if (rows === 0) {
      const fullname = `${firstName || ''} ${lastName || ''}`.trim();

      await conn.query('INSERT INTO users (clerkId, fullname, imageUrl) VALUES (?, ?, ?))', [id, fullname, imageUrl])
      }

      res.status(200).json({ success: true})

    } catch (error) {
      console.log('Error in auth callback', error)
      next(error) 
    }
  }
}