import { axiosInstance } from '@/lib/axios';
import { Album, Song } from '@/types';
import { create } from 'zustand';

interface MusicState {
  albums: Album[],
  songs: Song[],
  isLoading: boolean,
  error: string[] | Error | null,
  fetchAlbums: () => void
}


export const useMusicStore = create<MusicState>((set) => ({ 
  
  albums: [],
  songs: [],
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
    
  }
}))