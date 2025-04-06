import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Play, Repeat, Shuffle, SkipBack, SkipForwardIcon } from "lucide-react";
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
    <footer className="h-14 sm:h-18 bg-black px-4 rounded-lg mt-2">
      <div className="grid grid-cols-3 items-center h-full max-w-[2200px] mx-auto overflow-hidden">
        <div className="grid grid-cols-[1fr_8fr] gap-x-3 overflow-hidden h-full">
          <div className="flex h-10 w-10 sm:h-15 sm:w-15 mx-auto aspect-square my-auto">
            {currentSong?.image_Url && (
              <img src={currentSong?.image_Url} className="object-center object-cover w-full h-full aspect-square rounded-md"/>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-md font-light">{currentSong?.title}</h1>
            <h1 className="text-xs text-zinc-400">{currentSong?.artist}</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center max-w-full gap-2">
          <div className="flex flex-row gap-x-9 items-center">
            <Shuffle className="size-4"/>
            <SkipBack className="size-4"/>
            <button className="bg-white p-2 rounded-full"><Play className="size-4 text-black"/></button>
            <SkipForwardIcon className="size-4"/>
            <Repeat className="size-4"/>
          </div>
          <div className="flex justify-center">
          </div>
        </div>
        <div className="flex justify-center">
          botones extras (volumen)
        </div>
      </div>
    </footer>
  )
}
