import { Playlist } from '@/types'
import { Link } from 'react-router-dom'

interface PlaylistProps {
  playlist: Playlist

}

export const PlaylistItem = ({ playlist }: PlaylistProps) => {
  return (
    <Link to={`/playlist/${playlist.playlist_id}`}>
      <div className='flex flex-row items-center justify-start cursor-pointer gap-x-2 hover:bg-zinc-950 rounded-sm py-1 px-2'>
        <div className='w-1/4 max-w-20 h-full min-w-8'>
          <img src={playlist.image_url || '/spotify-black.jpg'} className='rounded-sm object-'/>
        </div>
        <div className='flex flex-col'>
          <h1>{playlist.name}</h1>
        </div>
      </div>
    </Link>
  )
}
