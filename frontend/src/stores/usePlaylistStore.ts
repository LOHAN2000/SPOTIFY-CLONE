import { axiosInstance } from "@/lib/axios";
import { Playlist } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface PlaylistState {
  playlist: Playlist | null,
  playlists: Playlist[],
  isLoadingFetch: boolean,
  isLoadingPost: boolean,
  isLoadingPlaylist: boolean,
  error: string[] | Error | null,
  message: Playlist[]
  
  fetchPlaylists: (id: string) => Promise<void>,
  postPlaylist: (name: string, description: string, image_url: string) => Promise<void>,
  fetchPlaylistById: (id: number | string) => Promise<void>,
  addSongToPlaylist: (songId: number | string, playlistId: number | string) => Promise<void>,
  deletePlayslistSong: (songId: number, playlistId: number) => Promise<void>

}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlist: null,
  playlists: [],
  message: [],
  isLoadingFetch: false,
  isLoadingPost: false,
  isLoadingPlaylist: false,
  error: null,
  
  fetchPlaylists: async (id) => {
    set({ isLoadingFetch: true, error: null });
    try {
      const response = await axiosInstance.get(`/playlist/users/${id}`);
      set({ playlists: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoadingFetch: false });
    }
  },

  postPlaylist: async (name, description, image_url) => {
    set({ isLoadingPost: true, error: null });
    try {
      const response = await axiosInstance.post(`/playlist/create`,{ name, description, image_url });
      set((state) => ({
        playlists: [...state.playlists, response.data.playlist],
        message: response.data.message,
      }));
      return response.data;
    } catch (error: any) {
      set({ error: error.response?.data?.message });
      throw new Error(error.response?.data?.message || "Error al crear playlist");
    } finally {
      set({ isLoadingPost: false });
    }
  },

  fetchPlaylistById: async (id) => {
    set({isLoadingPlaylist: true, error:null})

    try {
      const response = await axiosInstance.get(`/playlist/${id}`)
      set({ playlist: response.data})
    } catch (error: any) {
      set({error: error.response.data.message})
    } finally {
      set({isLoadingPlaylist: false})
    }
  },

  addSongToPlaylist: async (songId, playlistId) => {
  set({ isLoadingPlaylist: true, error: null });
  try {
    const { data } = await axiosInstance.post('playlist/song', { songId, playlistId });
    const updated = data.playlist as Playlist;

    set((state) => {
      const playlists = state.playlists.map(pl =>
        pl.playlist_id === updated.playlist_id ? updated : pl
      );
      const playlist =
        state.playlist?.playlist_id === updated.playlist_id
          ? updated
          : state.playlist;

      return { playlists, playlist };
    });

    toast.success(data.message);
  } catch (error: any) {
    set({ error: error.message });
    toast.error('Error al añadir la canción');
  } finally {
    set({ isLoadingPlaylist: false });
  }
},

deletePlayslistSong: async (songId, playlistId) => {
  set({ isLoadingPlaylist: true, error: null})
  try {
    await axiosInstance.delete(`playlist/playlistId/${playlistId}/songId/${songId}`)
    set((state) => ({
      playlist: state.playlist?.playlist_id === playlistId ? { ...state.playlist, songs: state.playlist.songs.filter(s => s.song_id !== songId) } : state.playlist
    }))

    toast.success('Song deleted')
  } catch (error: any) {
    set({ error: error.message });
    toast.error('Error deleting song');
  } finally {
    set({ isLoadingPlaylist: false, error: null})
  }
}
}))