import { PlaylistSkeletons } from '@/components/skeletons/PlaylistSkeletons'
import { useMusicStore } from '@/stores/useMusicStore'
import { SignedIn } from '@clerk/clerk-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { House, Library, MessageCircle } from 'lucide-react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const LeftSideBar = () => {

  const { albums, isLoading, fetchAlbums } = useMusicStore()

  useEffect(() => {
    fetchAlbums();
  }, [])

  console.log(albums);

  return (
    <div className='h-full flex flex-col gap-y-2'>
      <div className='flex flex-col bg-zinc-900/75 backdrop-blur-md z-10 rounded-lg gap-y-7 px-6 py-5'>
        <Link to='/'>
          <span className='flex flex-row items-center font-bold text-zinc-200 gap-x-3'><House size={20}/><h1 className='hidden sm:block'>Home</h1></span>
        </Link>
        <SignedIn>
          <Link to='/chat'>
            <span className='flex flex-row items-center font-bold text-zinc-200 gap-x-3'><MessageCircle size={20}/><h1 className='hidden sm:block'>Messages</h1></span>
          </Link>
        </SignedIn>
      </div>
      <div className='flex flex-col h-screen rounded-lg bg-zinc-900/75 backdrop-blur-md px-6 py-5 gap-y-5'>
        <span className='flex flex-row items-center font-bold text-zinc-200 gap-x-3'><Library size={20}/><h1 className='hidden sm:block'>Playlist</h1></span>
        <ScrollArea className='h-[calc(100vh-300px)]'>
          <div className='space-y-2'>
            {isLoading ? (
              <PlaylistSkeletons/>
            ) : (
              <h1>Some music</h1>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
