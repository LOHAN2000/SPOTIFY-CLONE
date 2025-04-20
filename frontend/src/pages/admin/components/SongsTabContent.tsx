import { Music, Plus } from 'lucide-react'
import { SongsTable } from './SongsTable'
import { AddSongModal } from './AddSongModal';

export const SongsTabContent = () => {
  return (
    <div className='flex flex-col bg-zinc-800 p-2 sm:p-6 rounded-lg gap-y-3 h-full overflow-hidden'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <div className='flex space-x-2'>
            <Music className='text-emerald-600'/>
            <h1 className='font-semibold sm:font-bold'>Songs Library</h1>
          </div>
          <h1 className='text-zinc-300 text-sm sm:text-md'>Manage your music tracks</h1>
        </div>
        <button onClick={() => {const modal = document.getElementById('modal_addSong') as HTMLDialogElement | null; modal?.showModal();}} className='flex bg-emerald-500 rounded-lg py-1 px-4 justify-center items-center space-x-1 hover:bg-emerald-500/80 cursor-pointer transition-colors'>
          <Plus className='text-black size-3 sm:size-5'/>
          <h1 className='text-black font-bold text-xs 2xl:text-md'>Add Song</h1>
        </button>
      </div>
      <SongsTable/>
      <AddSongModal/>
    </div>
  )
}
