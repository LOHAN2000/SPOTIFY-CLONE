import { axiosInstance } from "@/lib/axios";
import { Playlist } from "@/types";
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
  fetchPlaylistById: (id: number | string) => Promise<void>

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
  } 
}))