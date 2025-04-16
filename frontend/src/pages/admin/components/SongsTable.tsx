import { useMusicStore } from '@/stores/useMusicStore'
import { LoaderCircle } from 'lucide-react';
import React from 'react'

export const SongsTable = () => {

  const { songs, isLoading } = useMusicStore();


  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <LoaderCircle className='animate-spin size-6'/>
      </div>
    )
  }

  return (
    <div className='flex flex-col p-3 space-y-3'>
      <div className='grid grid-cols-[3fr_1fr_1fr_1fr] items-center justify-center'>
        <div className='flex items-center  text-zinc-300'>Title</div>
        <div className='flex items-center justify-center text-zinc-300'>Artist</div>
        <div className='flex items-center justify-center text-zinc-300'>Release Date</div>
        <div className='flex items-center justify-center text-zinc-300'>Actions</div>
      </div>
      {songs.map((song, index) => (
        <div className='grid grid-cols-[3fr_1fr_1fr_1fr] items-center justify-center'>
          <div className='grid grid-cols-[auto_2fr] items-center gap-2 text-zinc-300'>
            <div className='size-8 sm:size-10 md:size-13'>
              <img src={song.image_Url} className='object-cover w-full h-full aspect-square rounded-sm'/>
            </div>
            <div className='flex overflow-y-hidden'>
              <h1 className='text-sm sm:text-base md:text-lg truncate'>{song.title}</h1>
            </div>
          </div>
          <div className='flex items-center justify-start text-zinc-300 '>
            {song.artist}
          </div>
          <div className='flex items-center justify-center text-zinc-300'>Release Date</div>
          <div className='flex items-center justify-center text-zinc-300'>Actions</div>
        </div>
      ))}
    </div>
  )
}
