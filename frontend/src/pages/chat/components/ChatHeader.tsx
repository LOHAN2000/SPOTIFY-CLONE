import { useChatStore } from '@/stores/useChatStore'

export const ChatHeader = () => {

  const { selectedUser, onlineUsers } = useChatStore();

  return (
    <div className='grid grid-cols-[auto_2fr] px-3 py-5 space-x-2'>
      <div className='size-12 rounded-full overflow-hidden'>
        <img src={selectedUser?.image_Url} className='w-full h-full object-contain object-center'/>
      </div>
      <div className='text-start my-auto'>
        <h1>{selectedUser?.user_fullname}</h1>
        <p className='text-sm text-zinc-400'>{onlineUsers.has(selectedUser!.clerkId) ? 'Online' : 'Offline'}</p>
      </div>
    </div>
  )
}
