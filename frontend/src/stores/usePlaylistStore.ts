import { axiosInstance } from "@/lib/axios";
import { create } from "zustand";

interface PlaylistState {
  playlists: any,
  isLoading: boolean,
  error: string[] | Error | null,
  fetchPlaylists: (id: string) => Promise<void>
}

export const usePlaylistStore = create<PlaylistState>((set) => ({
  playlists: [],
  isLoading: false,
  error: null,
  
  fetchPlaylists: async (id) => {
    set({isLoading: true, error:null})
    try {
      const response = await axiosInstance.get(`/playlist/${id}`);
      set({playlists: response.data})
    } catch (error: any) {
      set({error: error.response.data.message})
    } finally {
      set({isLoading:false})
    }
  }
}))