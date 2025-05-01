import { useChatStore } from '@/stores/useChatStore'

export const UserList = () => {

  const { users, selectedUser, isLoading, setSelectedUser, onlineUsers } = useChatStore();

  console.log(users)

  return (
    <div className='h-full border-r border-zinc-800 overflow-hidden'>
      <div className='flex flex-col h-full items-start p-5 space-y-5 overflow-y-auto'>
        {users?.map((user) => (
          <div key={user.clerkId} className='grid grid-cols-[auto_2fr] items-center justify-start space-x-2'>
            <div className='size-15 rounded-full overflow-hidden'>
              <img src={user.image_Url} className='w-full h-full object-cover aspect-square'/>
            </div>
            <h1>{user.user_fullname}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}