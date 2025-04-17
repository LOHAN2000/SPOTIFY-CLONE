import { useMusicStore } from '@/stores/useMusicStore'
import { LoaderCircle, Trash } from 'lucide-react';

export const SongsTable = () => {

  const { songs, isLoading, deleteSong } = useMusicStore();

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <LoaderCircle className='animate-spin size-6'/>
      </div>
    )
  }

  return (
    <div className='flex flex-col p-0 sm:p-3 space-y-3 h-full overflow-auto'>
      <div className='grid grid-cols-[3fr_2fr_2fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] items-center justify-center'>
        <div className='flex items-center  text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Title</div>
        <div className='flex items-center justify-start text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Artist</div>
        <div className='flex items-center justify-center text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Release Date</div>
        <div className='flex items-center justify-center text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Actions</div>
      </div>
      {songs.map((song) => (
        <div key={song.song_id} className='grid grid-cols-[3fr_2fr_2fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] items-center justify-center'>
          <div className='grid grid-cols-[auto_2fr] items-center gap-2 text-zinc-300'>
            <div className='size-8 sm:size-10 md:size-13'>
              <img src={song.image_Url} className='object-cover w-full h-full aspect-square rounded-sm'/>
            </div>
            <div className='flex overflow-y-hidden'>
              <h1 className='text-sm sm:text-base md:text-lg truncate'>{song.title}</h1>
            </div>
          </div>
          <div className='flex items-center justify-start text-zinc-300 text-sm sm:text-base md:text-lg truncate'>
            {song.artist}
          </div>
          <div className='flex items-center justify-center text-zinc-300 text-sm sm:text-base md:text-lg truncate'>{song.created_at.split('T')[0]}</div>
          <div className='flex items-center justify-center text-red-400/80'>{isLoading ? <LoaderCircle className='animate-spin size-4 sm:size-6'/> : <Trash onClick={() => deleteSong(song.song_id)} className='size-4 sm:size-6 cursor-pointer'/>} </div>
        </div>
      ))}
    </div>
  )
}
