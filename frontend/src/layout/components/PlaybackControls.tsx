import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { usePlayerStore } from "@/stores/usePlayerStore"
import { Play, Repeat, Shuffle, Sidebar, SkipBack, SkipForwardIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0').split('.')[0]}`
}

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
            <h1 className="text-xs sm:text-md lg:text-lg  font-light">{currentSong?.title}</h1>
            <h1 className="text-[10px] sm:text-xs lg:text-md text-zinc-400">{currentSong?.artist}</h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center max-w-full">
          <div className="flex flex-row gap-x-4 sm:gap-x-9 items-center">
            <Shuffle className="size-3 sm:size-4 cursor-pointer hover:text-zinc-400"/>
            <SkipBack className="size-3 sm:size-5 cursor-pointer hover:text-zinc-400"/>
            <button className="bg-white p-2 rounded-full cursor-pointer hover:bg-emerald-500 group transition-colors"><Play className="size-3 sm:size-5 text-black group-hover:text-white"/></button>
            <SkipForwardIcon className="size-3 sm:size-5 cursor-pointer hover:text-zinc-400"/>
            <Repeat className="size-3 sm:size-4 cursor-pointer hover:text-zinc-400"/>
          </div>
          <div className="hidden sm:flex items-center w-full">
          <div>{formatDuration(currentTime)}</div>
          <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={handleSeek}/>
          <div></div>
          </div>
        </div>
        <div className="flex items-center justify-end">
          botones extras (volumen)
        </div>
      </div>
    </footer>
  )
}
