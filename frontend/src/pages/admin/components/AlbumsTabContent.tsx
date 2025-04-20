import { Library, Plus } from 'lucide-react';
import { AlbumsTable } from './AlbumsTable';
import { AddAlbumModal } from './AddAlbumModal';

export const AlbumsTabContent = () => {
  return (
    <div className='flex flex-col bg-zinc-800 p-2 sm:p-6 rounded-lg gap-y-3 h-full overflow-hidden'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col'>
          <div className='flex space-x-2'>
            <Library className='text-purple-500'/>
            <h1 className='font-semibold sm:font-bold'>Albums Library</h1>
          </div>
          <h1 className='text-zinc-300 text-sm sm:text-md'>Manage your music albums</h1>
        </div>
        <button onClick={() => {const modal = document.getElementById('modal_addAlbum') as HTMLDialogElement | null; modal?.showModal();}} className='flex bg-purple-500 rounded-lg py-1 px-4 justify-center items-center space-x-1 hover:bg-purple-500/80 cursor-pointer transition-colors'>
          <Plus className='text-white size-3 sm:size-5'/>
          <h1 className='text-white font-bold text-xs 2xl:text-md'>Add Album</h1>
        </button>
      </div>
      <AlbumsTable/>
      <AddAlbumModal/>
    </div>
  )
}
