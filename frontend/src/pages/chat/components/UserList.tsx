import { useChatStore } from '@/stores/useChatStore'

export const UserList = () => {

  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

  console.log(onlineUsers)

  return (
    <div className='h-full border-r border-zinc-800 overflow-hidden'>
      <div className='flex flex-col h-full items-start py-5 overflow-y-auto'>
        {users?.map((user) => (
          <div key={user.clerkId} onClick={() => setSelectedUser(user)} className={`grid grid-cols-[auto_2fr] items-center justify-start space-x-2 ${user.clerkId === selectedUser?.clerkId ? 'bg-zinc-950' : ''} hover:bg-zinc-950 w-full p-2`}>
            <div className='size-15 rounded-full overflow-hidden'>
              <img src={user.image_Url} className='w-full h-full object-cover aspect-square'/>
              <div className={`absolute h-3 w-3 rounded-full ring-2 ring-zinc-900 ${onlineUsers.has(user.clerkId) ? "bg-green-500" : "bg-zinc-500"}`}>
              </div>
            </div>
            <h1>{user.user_fullname}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}