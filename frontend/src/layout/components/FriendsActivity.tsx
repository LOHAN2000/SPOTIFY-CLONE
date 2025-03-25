import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { Headphones, Music, Users } from 'lucide-react';
import { useEffect } from 'react'

export const FriendsActivity = () => {

  const { users, fetchUsers } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    fetchUsers()
  }, [user, fetchUsers])

  const isPlaying = true

  return (
    <div className='h-full bg-zinc-900 rounded-lg flex flex-col '>
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
      <div className='flex flex-col mt-5 justify-center'>
        {users?.map((user) => (
          <div key={user.clerkId} className='flex items-start  hover:bg-zinc-800/50 transition-colors cursor-pointer group gap-x-4 p-3'>
            <div className='flex w-1/5 max-w-14 min-w-8 my-auto'>
              <img src={user.image_Url} className='w-full h-full object-contain rounded-full'/>
            </div>
            <div className='flex flex-col justify-center'>
              <h1 className='font-bold text-sm'>{user.user_fullname}</h1>
              {isPlaying && (
                <h1>music</h1>
              )}
            </div>
            {isPlaying && (
              <div className='flex my-auto'>
                <Music size={15} className='text-emerald-400 mt-1 '/>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
