import { conn } from "../config/db.js";

export class PlaylistController {
  static async createPlaylist (req, res, next) {
    try {
      const { name, description, image_url } = req.body;
      const currenUserId = req.auth.userId;

      const [result] = await conn.query('INSERT INTO playlist (clerkId, name, description, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [currenUserId, name, description, image_url])

      if (result.affectedRows === 0) {
        return res.status(400).json({message: 'Error creating Playlist'})
      };

      const playlistId = result.insertId;
      const [rows] = await conn.query('SELECT * FROM playlist WHERE playlist_id = ?', [playlistId]);

      res.status(200).json({success: true, playlist: rows[0]})

    } catch (error) {
      console.log('Error in createPlaylist', error);
      next(error);
    }
  }

  static async addSongToPlaylist (req, res, next) {
    try {
      const { songId, playlistId } = req.body;

      const [result] = await conn.query('INSERT INTO playlist_songs (playlist_id, song_id, added_at) VALUES(?, ?, CURRENT_TIMESTAMP)', [playlistId, songId]);

      if (result.affectedRows === 0) {
        return res.status(404).json('Error adding song to playlist')
      }

      res.status(201).json({message: 'Song added to playlist succesfully'});
    } catch (error) {
      console.log('Error in addSongToPlaylist', error);
      next(error);
    }
  }

  static async deleteSongFromPlaylist (req, res, next) {
    try {
      const { playlistId, songId } = req.params;

      const [result] = await conn.query('DELETE FROM playlist_songs WHERE playlist_id = ? AND song_id = ?', [playlistId, songId]);

      if (result.affectedRows === 0) {
        return res.status(404).json({message: 'Song not found in playlist'})
      }

      res.status(200).json({message: 'Song deleted'})
    } catch (error) {
      console.log('Error in deleteSongFromPlaylist', error);
      next(error);
    }
  }

  static async getUserPlaylists (req, res, next) {
    try {
      const { id } = req.params;

      const [playlist] = await conn.query('SELECT * FROM playlist WHERE clerkId = ?', [id]);

      res.status(200).json(playlist)
    } catch (error) {
      console.log('Error in getUserPlaylists');
      next(error);
    }
  }

  static async getPlaylistSongs (req, res, next) {
    try {
      const { id } = req.params;

      const [songs] = await conn.query(`
        SELECT s.*
        FROM song as s
        JOIN playlist_songs as ps ON ps.song_id = s.song_id
        WHERE ps.playlist_id = ?`, [id])
      
      res.status(200).json(songs)
    } catch (error) {
      console.log('Error in getPlaylistSongs', error);
      next(error);
    }
  }
}