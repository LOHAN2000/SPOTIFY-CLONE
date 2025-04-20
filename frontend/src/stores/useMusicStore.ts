import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import { toast } from 'sonner';
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
  stats: Stats

  fetchAlbums: () => void,
  fetchAlbumById: (id: number | string) => void;
  fetchFeaturedSongs: () => void;
  fetchMadeForYouSongs: () => void;
  fetchTrendingSongs: () => void;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: number) => Promise<void>;
  deleteAlbum: (id: number) => Promise<void>;
  postNewSong: (formData: FormData) => Promise<void>;
  postNewAlbum: (formData: FormData) => Promise<void>;
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
  stats: {
    totalAlbums: 0,
    totalSongs: 0,
    totalUsers: 0,
    totalArtists: 0
  },
  
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

  fetchSongs: async () => {
    set({ isLoading: true, error: null})
    try {
      const response = await axiosInstance.get('/songs')
      set({ songs: response.data })
    } catch (error: any) {
      set({error: error.response.data.message})
    } finally {
      set({ isLoading: false })
    }
  },

  fetchStats: async () => {
    set({ isLoading: true, error: null})
    try {
      const response = await axiosInstance.get('/stats')
      set({ stats: response.data })
    } catch (error: any) {
      set({error: error.response.data.message})
    } finally {
      set({ isLoading: false })
    }
  },

  deleteSong: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await axiosInstance.delete(`/admin/songs/${id}`)
      set(state => ({
        ...state,
        songs: state.songs.filter(song => song.song_id !== id)
      }))
      toast.success('Song deleted successfully')
    } catch (error: any) {
      set({ error: error.response.data.message })
    } finally {
      set({ isLoading:false})
    }
  },

  deleteAlbum: async (id) => {
    set({ isLoading: true, error: null})
    try {
      await axiosInstance.delete(`/admin/${id}`)
      set(state => ({
        albums: state.albums.filter(album => album.album_id !== id),
        songs: state.songs.map(song =>
        song.album_id === id ? { ...song, album: null } : song                   
      )
      }))
      toast.success('Album deleted successfully')
    } catch (error:any) {
      set({ error: error.response.data.message })
    } finally {
      set({ isLoading: false })
    }
  },

  postNewSong: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post('/admin/songs', formData);
      set((state) => ({ songs: [response.data, ...state.songs], stats: {...state.stats, totalSongs: state.stats.totalSongs + 1}}))

      toast.success('Song created')

    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Error al agregar canción' });
    } finally {
      set({ isLoading: false})
    }
  },

  postNewAlbum: async (formData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axiosInstance.post('/admin/album', formData)
      set((state) => ({ albums: [response.data, ...state.albums], stats: {...state.stats, totalAlbums: state.stats.totalAlbums + 1}}))

      toast.success('Album created')
    } catch (error: any) {
      set({ error: error.response.data.message || 'Error al crear album'})
    } finally {
      set({ isLoading: false })
    }
  }
}))