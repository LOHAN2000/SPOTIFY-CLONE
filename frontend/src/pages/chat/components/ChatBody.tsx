import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { useEffect, useRef } from 'react';

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
          <div key={message.message_id} className={`flex items-center ${isMine ? 'flex-row-reverse space-x-2 space-x-reverse' : 'space-x-2'}`}>
            <div className='w-8 h-8 rounded-full overflow-hidden'>
              <img src={isMine ? user.imageUrl : selectedUser?.image_Url} className='w-full h-full object-cover'/>
            </div>
            <h1 className={`text-start  ${isMine ? 'bg-emerald-600' : 'bg-zinc-600'} p-2 rounded-xl max-w-2xl`}>{message.content}</h1>
          </div>
        );
      })}
      <div ref={bottomRef} className=''/>
    </div>
  )
}
