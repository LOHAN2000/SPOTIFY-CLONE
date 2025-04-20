import { useMusicStore } from '@/stores/useMusicStore';
import { Trash } from 'lucide-react';

export const AlbumsTable = () => {
  
  const { albums, deleteAlbum } = useMusicStore();
  
  return (
    <div className='flex flex-col p-0 sm:p-3 space-y-3 h-full overflow-auto'>
      <div className='grid grid-cols-[3fr_2fr_2fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] items-center justify-center'>
        <div className='flex items-center  text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Title</div>
        <div className='flex items-center justify-start text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Artist</div>
        <div className='flex items-center justify-center text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Release Date</div>
        <div className='flex items-center justify-center text-zinc-300 text-sm sm:text-base md:text-lg truncate'>Actions</div>
      </div>
      {albums.map((album) => (
        <div key={album.album_id} className='grid grid-cols-[3fr_2fr_2fr_1fr] sm:grid-cols-[3fr_1fr_1fr_1fr] items-center justify-center hover:bg-zinc-600/20'>
          <div className='grid grid-cols-[auto_2fr] items-center gap-2 text-zinc-300'>
            <div className='size-8 sm:size-10 md:size-13'>
              <img src={album.imageUrl} className='object-cover w-full h-full aspect-square rounded-sm'/>
            </div>
            <div className='flex overflow-y-hidden'>
              <h1 className='text-sm sm:text-base md:text-lg truncate'>{album.title}</h1>
            </div>
          </div>
          <div className='flex items-center justify-start text-zinc-300 text-sm sm:text-base md:text-lg truncate'>
            {album.artist}
          </div>
          <div className='flex items-center justify-center text-zinc-300 text-sm sm:text-base md:text-lg truncate'>{album.created_at.split('T')[0]}</div>
          <div className='flex items-center justify-center text-red-400/80'><Trash onClick={() => deleteAlbum(album.album_id)} className='size-4 sm:size-6 cursor-pointer'/></div>
        </div>
      ))}
    </div>
  )
}
