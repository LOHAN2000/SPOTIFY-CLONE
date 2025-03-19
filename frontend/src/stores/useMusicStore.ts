import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicState {
  albums: Album[],
  album: Album | null,
  songs: Song[],
  isLoading: boolean,
  error: string[] | Error | null,
  fetchAlbums: () => void,
  fetchAlbumById: (id: number | string) => void;
}


export const useMusicStore = create<MusicState>((set) => ({ 
  
  albums: [],
  songs: [],
  album: null,
  isLoading: false,
  error: null,
  
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
  } 
}))