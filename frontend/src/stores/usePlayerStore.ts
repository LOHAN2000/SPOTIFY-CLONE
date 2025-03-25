import { Song } from "@/types";
import { create } from "zustand";


interface PlayerStore {
  currentSong: Song | null,
  isPlaying: boolean,
  queue: Song[],
  currentIndex: number,

  initializeQueue: (songs: Song[]) => void,
  playAlbum: (songs: Song[], starIndex: number) => void,
  setCurrentSong: (song: Song | null) => void,
  togglePlay: () => void;
  playNext: () => void,
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong; null,
  isPlaying: false,
  queue: [],
  currentIndex: 0,

}))