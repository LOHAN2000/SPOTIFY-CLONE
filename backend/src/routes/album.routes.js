import express from 'express';
import { AlbumController } from '../controllers/album.controller.js';

const router = express.Router()

router.get('/', AlbumController.getAllAlbums)
router.get('/:albumId', AlbumController.getAlbumById)


export default router;