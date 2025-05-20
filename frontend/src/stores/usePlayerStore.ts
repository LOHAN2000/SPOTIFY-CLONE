import { Song } from "@/types";
import { create } from "zustand";
import { useChatStore } from "./useChatStore";


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

    const socket = useChatStore.getState().socket;

    if(songs.length === 0) {
      return;
    }
    const song = songs[starIndex];

    if(socket.auth) {
      socket.emit('update_activity' , {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`
      })
    }


    set({ queue: songs, currentSong: song, currentIndex: starIndex, isPlaying: true });
  },

  setCurrentSong: async (song = null) => {

    const socket = useChatStore.getState().socket;

    if (!song) {
      return;
    }

    if(socket.auth) {
      socket.emit('update_activity' , {
        userId: socket.auth.userId,
        activity: `Playing ${song.title} by ${song.artist}`
      })
    }

    const songIndex = get().queue.findIndex(s => s.song_id === song.song_id);
    
    set({ currentSong: song, isPlaying: true, currentIndex: songIndex !== -1 ? songIndex : get().currentIndex });
  },

  togglePlay: async () => {
    const willStartPlaying = !get().isPlaying;

    const currentSong = get().currentSong;
    const socket = useChatStore.getState().socket

    if (socket.auth) {
      socket.emit('update_activity', {
        userId: socket.auth.userId,
        activity: willStartPlaying && currentSong ? `Playing ${currentSong.title} by ${currentSong.artist}` : 'Idle'
      })
    }

    set({ isPlaying: willStartPlaying })
  },

  playNext: async () => {
    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < queue.length) {

      const socket = useChatStore.getState().socket;
      const nextSong = queue[nextIndex];

      if (socket.auth) {
      socket.emit('update_activity' , {
        userId: socket.auth.userId,
        activity: `Playing ${nextSong.title} by ${nextSong.artist}`
        })
      }
      set({ currentSong: nextSong, currentIndex:nextIndex, isPlaying: true })
    } else {
      set({ isPlaying: false })
      
      const socket = useChatStore.getState().socket;

      if (socket.auth) {
        socket.emit('update_activity' , {
        userId: socket.auth.userId,
        activity: `Idle`
        })
      }
    }
  },

  playPrevious: async () => {
    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    if(prevIndex >= 0) {
      const socket = useChatStore.getState().socket;
      const prevSong = queue[prevIndex];
      
      if (socket.auth) {
        socket.emit('update_activity' , {
        userId: socket.auth.userId,
        activity: `Playing ${prevSong.title} by ${prevSong.artist}`
        })
      }
      set({ currentSong: prevSong, currentIndex: prevIndex, isPlaying: true });
    } else {
      set({ isPlaying: false });

      const socket = useChatStore.getState().socket;

      if (socket.auth) {
        socket.emit('update_activity' , {
        userId: socket.auth.userId,
        activity: `Idle`
        })
      }
    } 
  }
}))