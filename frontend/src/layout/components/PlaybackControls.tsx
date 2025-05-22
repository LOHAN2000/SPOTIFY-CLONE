import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore"
import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForwardIcon, Volume1, VolumeOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";


const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
}

export const PlaybackControls = () => {

  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const { playlists, addSongToPlaylist } = usePlaylistStore();

  console.log(playlists)

  const [volume, setVolume] = useState(40);
  const [muted, setMuted] = useState(false);
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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = muted;
    }
  }, [muted]);

  return (
    <footer className="h-14 sm:h-18 bg-black px-4 rounded-lg mt-2">
      <div className="grid grid-cols-3 items-center h-full max-w-[2500px] mx-auto overflow-hidden">
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
        <div className="flex flex-col items-center justify-center max-w-full h-full gap-y-2">
          <div className="flex flex-row gap-x-4 sm:gap-x-9 items-center">
            <Shuffle className="size-3 sm:size-4 cursor-pointer hover:text-zinc-400"/>
            <SkipBack onClick={playPrevious} className="size-3 sm:size-5 cursor-pointer hover:text-zinc-400"/>
            <button onClick={togglePlay} className="bg-white p-2 rounded-full cursor-pointer hover:bg-emerald-500 group transition-colors">
              {isPlaying ? (
                <Pause className="size-3 sm:size-5 text-black group-hover:text-white"/>
              ) : (
                <Play className="size-3 sm:size-5 text-black group-hover:text-white"/>
              )}
            </button>
            <SkipForwardIcon onClick={playNext}  className="size-3 sm:size-5 cursor-pointer hover:text-zinc-400"/>
            <Repeat className="size-3 sm:size-4 cursor-pointer hover:text-zinc-400"/>
          </div>
          <div className="hidden sm:flex items-center w-full gap-x-2">
            <div><h1 className="text-xs sm:text-sm text-zinc-400">{formatDuration(currentTime)}</h1></div>
            <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={handleSeek} disabled={!currentSong} className="w-full hover:cursor-pointer"/>
            <div><h1 className="text-xs sm:text-sm text-zinc-400">{formatDuration(duration)}</h1></div>
          </div>
        </div>
        <div className="flex w-full h-full justify-end">
          <div className="flex sm:grid sm:grid-cols-[1fr_1fr_1fr_5fr] h-full items-center w-full max-w-full sm:max-w-sm">
            <Mic2 className="mx-auto size-3 sm:size-5"/>
            <button className="cursor-pointer" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" } as React.CSSProperties }>
              <ListMusic className="mx-auto size-3 sm:size-5"/>
            </button>
            <ul className="dropdown dropdown-top dropdown-end menu h-70 rounded-box bg-[rgb(18,18,18)] shadow-sm space-y-1"popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" } as React.CSSProperties }>
                <li className="sticky -top-2.5 bg-[rgb(18,18,18)] z-50 py-1 text-lg">Playlists:</li>
                {playlists.map((pl) => (
                <li onClick={() => addSongToPlaylist(currentSong!.song_id, pl.playlist_id)} className="text-md hover:bg-zinc-700 cursor-pointer py-1 font-semibold px-1">{pl.name}</li>
                ))}
            </ul>
            <Laptop2 className="mx-auto size-3 sm:size-5"/>
            <div className="hidden sm:flex items-center px-4 gap-x-1.5">
              {muted ? (
                <VolumeOff onClick={() => setMuted(prev => !prev)} className="size-3 sm:size-6 cursor-pointer"/>
              ) : (
                <Volume1 onClick={() => setMuted(prev => !prev)} className="size-3 sm:size-6 cursor-pointer"/>
              )}
              <Slider value={[volume]} max={100} step={1} onValueChange={(value) => {setVolume(value[0]); if (audioRef.current) audioRef.current.volume = value[0] /100}} disabled={muted} className="w-full hover:cursor-pointer"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
