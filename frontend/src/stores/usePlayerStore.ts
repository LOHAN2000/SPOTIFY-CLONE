import { Song } from "@/types";
import { create } from "zustand";


interface PlayerStore {
  currentSong: Song | null,
  isPlaying: boolean,
  queue: Song[],
  currentIndex: number,

  initializeQueue: (songs: Song[]) => void,
  playCollection: (songs: Song[], starIndex: number) => void,
  setCurrentSong: (song: Song | null) => void,
  togglePlay: () => void;
  playNext: () => void,
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

  initializeQueue: async (songs) => {
    set({ queue: songs, currentSong: get().currentSong || songs [0], currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex})
  },

  playCollection: async (songs, starIndex = 0) => {
    if(songs.length === 0) {
      return;
    }
    const song = songs[starIndex];
    set({ queue: songs, currentSong: song, currentIndex: starIndex, isPlaying: true });
  },

  setCurrentSong: async (song = null) => {
    if (!song) {
      return;
    }

    const songIndex = get().queue.findIndex(s => s.song_id === song.song_id);
    
    set({ currentSong: song, isPlaying: true, currentIndex: songIndex !== -1 ? songIndex : get().currentIndex });
  },

  togglePlay: async () => {
    const willStartPlaying = !get().isPlaying;
    set({ isPlaying: willStartPlaying })
  },

  playNext: async () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({ currentSong: nextSong, currentIndex:nextIndex, isPlaying: true })
    } else (
      set({ isPlaying: false })
    )
  },

  playPrevious: async () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if(prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({ currentSong: prevSong, currentIndex: prevIndex, isPlaying: true });
    } else {
      set({ isPlaying: false });
    } 
  }
}))