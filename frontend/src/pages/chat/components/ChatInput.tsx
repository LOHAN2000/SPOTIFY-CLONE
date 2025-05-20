import { useChatStore } from '@/stores/useChatStore'
import { useUser } from '@clerk/clerk-react';
import { CornerDownRight } from 'lucide-react'
import { useState } from 'react';

export const ChatInput = () => {

  const { sendMessage, selectedUser } = useChatStore();
  const { user } = useUser();
  const [newMessage, setNewMessage] = useState<string>('')

  const handleSubmit = () => {
    sendMessage(selectedUser!.clerkId, user!.id, newMessage)
  }

  return (
    <div className='grid grid-cols-[2fr_auto] mt-auto px-4 pb-1'>
      <input className='focus:outline-none border p-2 text-zinc-200 rounded-l-md' onChange={(e) => setNewMessage(e.target.value)} placeholder='Type a message'/>
      <CornerDownRight onClick={handleSubmit} type='submit' className='size-11 bg-emerald-500 p-1 rounded-r-md cursor-pointer hover:bg-emerald-600'/>
    </div>
  )
}
