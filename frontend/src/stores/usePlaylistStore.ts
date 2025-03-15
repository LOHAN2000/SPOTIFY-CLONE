import { axiosInstance } from "@/lib/axios";
import { Playlist } from "@/types";
import { create } from "zustand";

interface PlaylistState {
  playlists: Playlist[],
  isLoading: boolean,
  error: string[] | Error | null,
  message: Playlist[]
  
  fetchPlaylists: (id: string) => Promise<void>,
  postPlaylist: (name: string, description: string, image_url: string) => Promise<void>
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  message: [],
  isLoading: false,
  error: null,
  
  fetchPlaylists: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/playlist/users/${id}`);
      set({ playlists: response.data });
    } catch (error: any) {
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  postPlaylist: async (name: string, description: string, image_url: string) => {
    set({ isLoading: true, error: null });
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
      set({ isLoading: false });
    }
  },
}))