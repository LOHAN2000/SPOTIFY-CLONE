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
  static async createSong (req, res) {
    try {
      if (!req.files || !req.files.audioFile || !req.files.imageFile) {
        return res.status(400).json({message: 'Please upload all files'})
      }

      const { title, artist, albumId, duration } = req.body;
      const audioFile = req.files.audioFile;
      const imageFile = req.files.imageFile

      const audioUrl = await uploadToCloudinary(audioFile)
      const imageUrl = await uploadToCloudinary(imageFile)

      const [result] = await conn.query('INSERT INTO song (title, artist, audio_Url, image_Url, duration, album_id, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)', [title, artist, audioUrl, imageUrl, duration, albumId || null])

      const insertedSongId = result.insertId;
      const [songRows] = await conn.query('SELECT * FROM song WHERE song_id = ?', [insertedSongId])

      const song = songRows[0];

      res.status(201).json(song)

    } catch (error) {
      console.log('error in createSong function')
      next(error)
    }
  }
}