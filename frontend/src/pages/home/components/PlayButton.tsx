import { usePlayerStore } from '@/stores/usePlayerStore';
import { Song } from '@/types'
import { Play } from 'lucide-react'

interface PlayButtonProps {
  song: Song;
}

export const PlayButton = ({ song }: PlayButtonProps) => {

  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();
  const isCurrentSong = currentSong?.song_id === song.song_id;

  
  return (
    <button className="bg-emerald-500 p-1.5 rounded-sm cursor-pointer"><Play size={20}/></button>
  )
}
