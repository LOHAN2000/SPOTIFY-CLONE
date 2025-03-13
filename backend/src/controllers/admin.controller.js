import { conn } from "../config/db.js";
import cloudinary from '../config/cloudinary.js'

const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto'
    })
    return result.secure_url
  } catch (error) {
    console.log('Error in uploadToCloudinary function', error)
    throw new Error('Error uploading to cloudinary')
  }
}

export class AdminController {
  static async createSong (req, res, next) {
    try {
          
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({ message: 'Please upload all files' });
     }
      const { title, artist, albumId, duration } = req.body;
      const audioFile = req.files.audioFile;
      const imageFile = req.files.imageFile

      const audioUrl = await uploadToCloudinary(audioFile)
      const imageUrl = await uploadToCloudinary(imageFile)

      console.log(audioUrl, imageUrl)

      const [result] = await conn.query('INSERT IGNORE INTO song (title, artist, audio_Url, image_Url, duration, album_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [title, artist, audioUrl, imageUrl, duration, albumId || null])

      if (result.affectedRows === 0) {
        return res.status(409).json({message: 'Song duplicate'})
      }

      const insertedSongId = result.insertId;
      const [songRows] = await conn.query('SELECT * FROM song WHERE song_id = ?', [insertedSongId])

      const song = songRows[0];

      res.status(201).json(song)

    } catch (error) {
      console.log('error in createSong function')
      next(error)
    }
  }

  static async deleteSong (req, res, next) {
    try {
      const { id } = req.params;

      const [result] = await conn.query('DELETE FROM song WHERE song_id = ?', [id])

      if (result.affectedRows === 0) {
        return res.status(404).json({message: 'Song not found'})
      }

      res.status(200).json({message: 'Song deleted succesfully'})
      
    } catch (error) {
      console.log('Error in deleteSong', error)
      next(error);
    }
  }

  static async createAlbum (req, res, next) {
    try {
      const { title, artist, releaseYear } = req.body;
      const { imageFile } = req.files;


      if (!req.files || !req.files.imageFile) {
        return res.status(400).json({ message: 'Please upload the image file' });
      }

      const imageUrl = await uploadToCloudinary(imageFile);

      const [result] = await conn.query('INSERT IGNORE INTO album (title, artist, releaseYear, imageUrl, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [title, artist, releaseYear, imageUrl])

      if (result.affectedRows === 0) {
        return res.status(409).json({message: 'Album duplicate'})
      }

      const insertedAlbumId = result.insertId;
      const [albumRows] = await conn.query('SELECT * FROM album WHERE album_id = ?', [insertedAlbumId])
      const album = albumRows[0]

      res.status(201).json(album)

    } catch (error) {
      console.log('Error in createAlbum', error);
      next(error);
    }
  }

  static async deleteAlbum (req, res, next) {
    try {
      const { id } = req.params;
      
      const [result] = await conn.query('DELETE FROM album WHERE album_id = ?', [id])

      if (result.affectedRows === 0) {
        return res.status(404).json({message: 'Album not found'})
      }

      res.status(200).json({message: 'Album deleted succesfully'})

    } catch (error) {
      console.log('Error in deleteAlbum', error)
      next(error)
    }
  }

  static async checkAdmin (req, res, next) {
    res.status(200).json({ admin: true});
  }
}