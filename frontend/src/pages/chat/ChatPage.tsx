import { TopBar } from '@/components/TopBar';
import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { UserList } from './components/UserList';
import { ChatHeader } from './components/ChatHeader';
import { ChatBody } from './components/ChatBody';
import { ChatInput } from './components/ChatInput';

export const ChatPage = () => {

  const { user } = useUser();
  const { selectedUser, fetchMessages, fetchUsers } = useChatStore();

  useEffect(() => {
    if (user) fetchUsers();
  }, [user, fetchUsers])

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId)
  }, [selectedUser, fetchMessages])


  return (
    <main className='h-full flex flex-col rounded-lg bg-[rgb(18,18,18)]/30 overflow-hidden'>
      <TopBar/>
      <div className='h-full grid grid-cols-[1fr_4fr] sm:grid-cols-[2fr_5fr] overflow-hidden'>
        <UserList/>
        <div className='flex flex-col h-full overflow-hidden'>
          {selectedUser ? (
            <>
              <ChatHeader/>
              <ChatBody/>
              <ChatInput/>
            </>
          ) : (
            <div className='flex flex-col h-full items-center justify-center space-y-3'>
              <img src='./spotify.png' className='size-16 animate-pulse'/>
              <div className='text-center'>
                <h3 className='text-zinc-300 text-lg font-medium'>No conversation selected</h3>
                <p className='text-zinc-500 text-sm'>Choose a friend to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
