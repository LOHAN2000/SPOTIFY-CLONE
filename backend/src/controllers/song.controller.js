import { conn } from "../config/db.js";

export class SongController {
  static async getAllSongs (req, res, next) {
    try {
      const [songs] = await conn.query('SELECT * FROM song ORDER BY created_at DESC');
      res.status(200).json(songs);
    } catch (error) {
      console.log('Error in getAllSongs', error);
      next(error);
    }
  }

  static async getFeaturedSongs (req, res, next) {
    try {
      const [songs] = await conn.query('SELECT * FROM song ORDER BY RAND() LIMIT 6');
      res.status(200).json(songs);
    } catch (error) {
      console.log('Error in getFeaturedSongs', error);
      next(error);
    }
  }

  static async getMadeForYou (req, res, next) {
    try {
      const [songs] = await conn.query(`
        SELECT s.*, a.title AS album_title
        FROM song AS s
        INNER JOIN album as a ON s.album_id = a.album_id
        ORDER BY RAND()
        LIMIT 4  
      `);
      res.status(200).json(songs);
    } catch (error) {
      console.log('Error in getFeaturedSongs', error);
      next(error);
    }
  }

  static async getTrendingSongs (req, res, next) {
    try {
      const [songs] = await conn.query('SELECT * FROM song ORDER BY RAND() LIMIT 8');
      res.status(200).json(songs);
    } catch (error) {
      console.log('Error in getFeaturedSongs', error);
      next(error);
    }
  }
}