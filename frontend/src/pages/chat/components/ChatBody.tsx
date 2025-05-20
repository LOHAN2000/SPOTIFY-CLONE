import { useChatStore } from '@/stores/useChatStore'

export const ChatBody = () => {

  const { messages } = useChatStore();

  console.log(messages)

  return (
    <div className='flex flex-col h-full'>
      {messages.map((message) => (
        <div className='grid grid-cols-2] space-x-3'>
          <h1>{message.content}</h1>
          <h1>{message.created_at}</h1>
        </div>
      ))}
    </div>
  )
}
