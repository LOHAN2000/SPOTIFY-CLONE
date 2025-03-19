import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { Headphones, Music, Users } from 'lucide-react';
import { useEffect } from 'react'

export const FriendsActivity = () => {

  const { users, fetchUsers, isLoading} = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;
    fetchUsers()
  }, [user, fetchUsers])

  const isPlaying = false

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
      <div className='flex flex-col mt-5 px-4'>
        {users?.map((user) => (
          <div key={user.clerkId} className='flex items-start rounded-s-full rounded-e-2xl hover:bg-zinc-800/50 transition-colors cursor-pointer group gap-x-4'>
            <div className='h-1/5 w-1/5 max-w-18'>
              <img src={user.image_Url} className='w-full object-contain rounded-full'/>
            </div>
            <div className='flex flex-col'>
              <h1 className='font-bold'>{user.user_fullname}</h1>
              {isPlaying && (
                <h1>music</h1>
              )}
            </div>
            {isPlaying && (
              <Music size={15} className='text-emerald-400 mt-1'/>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
