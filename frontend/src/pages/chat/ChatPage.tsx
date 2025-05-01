import { TopBar } from '@/components/TopBar';
import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { UserList } from './components/UserList';

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
  <div className='h-full grid grid-cols-[2fr_5fr] overflow-hidden'>
    <UserList/>
  </div>
</main>
  )
}
