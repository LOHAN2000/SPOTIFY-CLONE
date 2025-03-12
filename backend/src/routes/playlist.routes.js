import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { PlaylistController } from '../controllers/playlist.controller.js';

const router = express.Router();

router.get('/:id', protectRoute, PlaylistController.getPlaylistSongs);
router.get('/users/:id', protectRoute, PlaylistController.getUserPlaylists);
router.post('/create', protectRoute, PlaylistController.createPlaylist);
router.post('/song', protectRoute, PlaylistController.addSongToPlaylist);
router.delete('/playlistId/:playlistId/songId/:songId', protectRoute, PlaylistController.deleteSongFromPlaylist);

export default router;