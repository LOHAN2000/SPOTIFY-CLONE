import { conn } from "../config/db.js";

export class AlbumController {
  static async getAllAlbums (req, res, next) {
    try {
      const [albums] = await conn.query('SELECT * FROM albums');
      const [songs] = await conn.query('SELECT * FROM songs');

      const songsByAlbums = {};

      songs.forEach(song => {
        if (!songsByAlbums[song.album_id]) {
          songsByAlbums[song.album_id] = [];
        }
        songsByAlbums[song.album_id].push(song);
      });

      const albumWithSongs = albums.map((album) => (
        {...album, songs: songsByAlbums[album_id] || []}
      ));

      res.status(200).json(albumWithSongs)

    } catch (error) {
      console.log('Error in getAllAlbums')
      next(error);
    }
  }

  static async getAlbumById (req, res, next) {
    try {
      const { albumId } = req.params;

      const [albumRows] = await conn.query('SELECT * FROM album WHERE album_id = ?', [albumId]);

      if (albumRows.length === 0) {
        return res.status(404).json({message: 'Album not found'});
      };

      const album = albumRows[0];

      const [songRows] = await conn.query('SELECT * FROM song WHERE album_id = ?', [albumId]);

      album.song = songRows;

      res.status(200).json(album);

    } catch (error) {
      console.log('Error in getAlbumById', error);
      next(error);
    }
  }
}