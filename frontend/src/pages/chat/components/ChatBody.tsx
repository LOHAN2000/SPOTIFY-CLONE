import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}


export const ChatBody = () => {

  const { user } = useUser();
  const { messages, selectedUser, fetchMessages } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth'})
  }, [messages])

  return (
    <div className='flex flex-col h-full gap-y-6 overflow-y-auto pt-5 px-3'>
      {messages.map((message) => {
        const isMine = message.sender_id === user?.id;
        return (
          <div key={message.message_id} className={`flex flex-col sm:flex-row sm:items-center ${isMine ? 'flex-col sm:jus items-end sm:flex-row-reverse space-x-2 space-y-2 sm:space-y-0 space-x-reverse' : 'space-x-2 space-y-2 sm:space-y-0'}`}>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
              <img src={isMine ? user.imageUrl : selectedUser?.image_Url} className='w-full h-full object-cover'/>
            </div>
            <div className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
              <h1 className={`text-start w-fit ${isMine ? 'bg-emerald-600' : 'bg-zinc-600'} p-2 rounded-xl max-w-2xl`}>{message.content}</h1>
              <h1 className='text-end text-sm sm:text-md text-zinc-500'>{formatDate(message.created_at)}</h1>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} className=''/>
    </div>
  )
}
