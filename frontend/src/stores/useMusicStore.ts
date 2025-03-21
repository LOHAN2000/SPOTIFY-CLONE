import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicState {
  albums: Album[],
  album: Album | null,
  songs: Song[],
  isLoading: boolean,
  error: string[] | Error | null,
  featuredSongs: Song[],
  madeForYouSongs: Song[],
  trendingSongs: Song[],

  fetchAlbums: () => void,
  fetchAlbumById: (id: number | string) => void;
  fetchFeaturedSongs: () => void;
  fetchMadeForYouSongs: () => void;
  fetchTrendingSongs: () => void;
}


export const useMusicStore = create<MusicState>((set) => ({ 
  
  albums: [],
  songs: [],
  album: null,
  isLoading: false,
  error: null,
  featuredSongs: [],
  madeForYouSongs: [],
  trendingSongs: [],
  
  fetchAlbums: async () => {
    set({isLoading: true, error: null})

    try {
      const response = await axiosInstance.get('/album');
      set({albums: response.data})
    } catch (error) {
      set({error: (error as any).response.data.message})
    } finally {
      set({isLoading: false})
    }
  },

  fetchAlbumById: async (id) => {
    set({isLoading: true, error: null})
    try {
      const response = await axiosInstance(`/album/${id}`)
      set({album: response.data})
    } catch (error: any) {
      set({error: error.response.data.message})
    } finally {
      set({isLoading: false})
    }
  },
  
  fetchFeaturedSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get('/songs/featured');
      set({ featuredSongs: response.data })
    } catch (error: any) {
      set({ error: error.response.data.message })
    } finally {
      set({ isLoading: false})
    }
  },

  fetchMadeForYouSongs: async () => {
    set({ isLoading: true, error: null})
    try {
      const response = await axiosInstance.get('/songs/made-for-you')
      set({ madeForYouSongs: response.data })
    } catch (error: any) {
      set({ error: error.response.data.message })
    } finally {
      set({ isLoading: false })
    }
  },

  fetchTrendingSongs: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.get('/songs/trending')
      set({ trendingSongs: response.data })
    } catch (error: any) {
      set({ error: error.response.data.message})
    } finally {
      set({ isLoading: false})
    }
  },
}))