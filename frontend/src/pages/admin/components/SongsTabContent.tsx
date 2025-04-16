import { Music, Plus } from 'lucide-react'
import { SongsTable } from './SongsTable'

export const SongsTabContent = () => {
  return (
    <div className='flex flex-col h-full bg-zinc-800 p-6 rounded-lg gap-y-3'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <div className='flex space-x-2'>
            <Music className='text-emerald-600'/>
            <h1 className='font-semibold sm:font-bold'>Songs Library</h1>
          </div>
          <h1 className='text-zinc-300 text-sm sm:text-md'>Manage your music tracks</h1>
        </div>
        <button className='flex bg-emerald-500 rounded-lg py-1 px-4 justify-center items-center space-x-1 hover:bg-emerald-500/80 cursor-pointer transition-colors'>
          <Plus className='text-black size-5 sm:size-5'/>
          <h1 className='text-black font-bold text-sm 2xl:text-md'>Add Song</h1>
        </button>
      </div>
      <SongsTable/>
    </div>
  )
}
