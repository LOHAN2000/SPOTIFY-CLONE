import { useChatStore } from '@/stores/useChatStore'

export const UserList = () => {

  const { users, selectedUser, setSelectedUser, onlineUsers } = useChatStore();

  return (
    <div className='h-full border-r border-zinc-800 overflow-hidden'>
      <div className='flex flex-col h-full items-start py-5 overflow-y-auto'>
        {users?.map((user) => (
          <div key={user.clerkId} onClick={() => setSelectedUser(user)} className={`grid sm:grid-cols-[auto_2fr] items-center justify-start space-x-2 ${user.clerkId === selectedUser?.clerkId ? 'bg-zinc-950' : ''} hover:bg-zinc-950 w-full p-2 cursor-pointer`}>
            <div className='relative size-8 sm:size-15 rounded-full'>
              <img src={user.image_Url} className='w-full h-full object-cover rounded-full'/>
              <div className={`absolute size-2 sm:size-3 bottom-0 rounded-full ring-2 ring-zinc-900 ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}>
              </div>
            </div>
            <h1 className='text-xs sm:text-md'>{user.user_fullname}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}