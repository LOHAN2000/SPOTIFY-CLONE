import { usePlayerStore } from '@/stores/usePlayerStore';
import { Song } from '@/types'
import { Pause, Play } from 'lucide-react'

interface PlayButtonProps {
  song: Song;
}

export const PlayButton = ({ song }: PlayButtonProps) => {

  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  const isCurrentSong = currentSong?.song_id === song.song_id;

  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song)
    }
  }
  
  return (
    <button onClick={handlePlay} className={`bg-emerald-500 p-1.5 rounded-sm cursor-pointer`}>{isPlaying && isCurrentSong ? <Pause size={20}/> : <Play size={20}/>}</button>
  )
}