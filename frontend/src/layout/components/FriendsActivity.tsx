import { useChatStore } from '@/stores/useChatStore'
import { usePlayerStore } from '@/stores/usePlayerStore';
import { useUser } from '@clerk/clerk-react';
import { Headphones, Music, Users } from 'lucide-react';
import { useEffect } from 'react'

export const FriendsActivity = () => {

  const { users, fetchUsers } = useChatStore();
  const { user } = useUser();
  
  const { currentSong } = usePlayerStore();

  useEffect(() => {
    if (!user) return;
    fetchUsers()
  }, [user, fetchUsers])

  const isPlaying = true

  return (
    <div className='h-full bg-[rgb(18,18,18)]/30 rounded-lg flex flex-col '>
      <div className='flex gap-x-2 p-4 items-center border-b border-zinc-800'>
        <Users/>
        <h1 className='font-bold hidden text-sm md:text-md sm:block'>What they're listening to</h1>
      </div>
      {!user && (
        <div className='relative flex flex-col p-4 items-center gap-y-5'>
          <div className='relative'>
            <div aria-hidden='true' className='absolute bg-gradient-to-r from-emerald-500 to-sky-500 rounded-full blur-lg opacity-75 animate-pulse'>  
               <div className='relative bg-zinc-900 rounded-full z-30'>
                  <Headphones size={65} className='border rounded-full text-emerald-400 p-3 '/>
               </div>
            </div>
              <div className='relative bg-zinc-900 rounded-full z-30'>
                <Headphones size={65} className='border rounded-full text-emerald-400 p-3 '/>
              </div>
          </div>
          <div className='flex flex-col gap-y-3 px-3 items-center'>
            <h1 className='font-bold text-center'>See What Friends Are Playing</h1>
            <h1 className='text-center text-zinc-400 text-sm'>Login to discover what music your friends are enjoying right now</h1>
          </div>
        </div>
      )}
      <div className='flex flex-col'>
      {users?.map((user) => (
          <div key={user.clerkId} className='grid grid-cols-[5fr_20fr_5fr] items-start  hover:bg-zinc-800/50 transition-colors cursor-pointer group gap-x-4 p-3'>
            <div className='flex max-w-10  my-auto items-center justify-center mx-auto'>
              <img src={user.image_Url} className='w-full h-full object-contain rounded-full'/>
            </div>
            <div className='flex flex-col justify-center overflow-x-hidden'>
              <h1 className='font-bold text-sm truncate'>{user.user_fullname}</h1>
              {isPlaying && (
                <h1 className='text-sm truncate'>{currentSong?.title}</h1>
              )}
            </div>
            {isPlaying && (
              <div className='flex my-auto'>
                <Music className='text-emerald-400 mt-1 w-3/4 max-w-4'/>
            </div>
              )}
          </div>
        ))}
        </div>
    </div>
  )
}
