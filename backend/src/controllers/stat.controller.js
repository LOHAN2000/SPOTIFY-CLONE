import { conn } from "../config/db.js";

export class StatController {
  static async getStats (req, res, next) {
    try {
      const [[songRows], [albumRows], [userRows], [artistRows]] = await Promise.all([
        conn.query('SELECT COUNT(*) AS totalSongs FROM song'),
        conn.query('SELECT COUNT(*) AS totalAlbums FROM album'),
        conn.query('SELECT COUNT(*) AS totalUsers FROM users'),
        conn.query(
          'SELECT COUNT(*) AS totalArtists FROM (SELECT artist FROM song UNION SELECT artist FROM album) AS unionArtists')
      ]);

      res.status(200).json({totalSongs: songRows[0].totalSongs, totalAlbums: albumRows[0].totalAlbums, totalUsers: userRows[0].totalUsers, totalArtists: artistRows[0].totalArtists});
    } catch (error) {
      console.log('Error in getStats', error);
      next(error);
    }
  }
}