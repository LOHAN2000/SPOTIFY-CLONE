import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef, useState } from "react";

export const PlaybackControls = () => {

  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = document.querySelector('audio');

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration)

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false })
    }

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    }
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
    }
  }

  return (
    <footer className="h-14 sm:h-18 bg-zinc-900/75 border-t border-zinc-800 px-4 rounded-lg mt-2">
      <div className="grid grid-cols-3 items-center h-full maw-w-[1800px] mx-auto overflow-hidden">
        <div className="grid grid-cols-[1fr_3fr] max-w-60">
          <div className="flex h-full w-full">
            <img src={currentSong?.image_Url} className="object-center object-cover"/>
          </div>
          <div className="flex flex-col justify-center">
            <h1>{currentSong?.title}</h1>
            <h1>{currentSong?.artist}</h1>
          </div>
        </div>
        <div className="flex justify-center">
          reproductor
        </div>
        <div className="flex justify-center">
          botones extras (volumen)
        </div>
      </div>
    </footer>
  )
}
