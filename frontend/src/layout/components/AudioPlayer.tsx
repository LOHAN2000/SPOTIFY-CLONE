import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

export const AudioPlayer = () => {

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null)

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  useEffect(() => {
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();   
    }
    audio?.addEventListener('ended', handleEnded)

    return () => audio?.removeEventListener('ended', handleEnded)
  }, [playNext])

  useEffect(() => {
    if(!audioRef.current || !currentSong) return;
    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.audio_Url;

    if(isSongChange) {
      audio.src = currentSong?.audio_Url
    }
  }, [])


  return <audio ref={audioRef}/>
}
