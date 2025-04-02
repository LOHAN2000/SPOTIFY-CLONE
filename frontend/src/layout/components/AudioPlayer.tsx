import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react"

export const AudioPlayer = () => {

  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null)

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // useEffect para pausar o reproducir cancion

  useEffect(() => {
    if(isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying])


  // useEffect para cambiar la cancion mediante playNext

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();   
    }
    audio?.addEventListener('ended', handleEnded)

    return () => audio?.removeEventListener('ended', handleEnded)
  }, [playNext])


  // useEffect para actualizar la cancion 

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audio = audioRef.current;
    const isSongChange = prevSongRef.current !== currentSong.audio_Url;
  
    if (isSongChange) {
      // Si la canción cambió, se actualiza el src y se reinicia
      audio.src = currentSong.audio_Url;
      audio.currentTime = 0;
      prevSongRef.current = currentSong.audio_Url;
      if (isPlaying) {
        audio.play();
      }
    } else {
      // Si es la misma canción, reiniciamos el tiempo y forzamos el play
      if (isPlaying) {
        audio.play();  // Se asegura que vuelva a reproducirse
      }
    }
  }, [currentSong, isPlaying]);


  return <audio ref={audioRef}/>
}
