import { PlaylistItem } from '@/components/leftSideBar/Playlist'
import { PlaylistSkeletons } from '@/components/skeletons/PlaylistSkeletons'
import { usePlaylistStore } from '@/stores/usePlaylistStore'
import { SignedIn, useUser } from '@clerk/clerk-react'
import { CirclePlus, FileUp, House, Library, Loader2Icon, MessageCircle, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export const LeftSideBar = () => {
  
  const [ formPlaylist, setFormPlaylist ] = useState<{name: string, description: string}>({
    name: '',
    description: '',
  })
  
  const { playlists, fetchPlaylists, postPlaylist, isLoadingFetch, isLoadingPost } = usePlaylistStore()

  const [img, setImg] = useState<string>('')
  const imgRef = useRef<HTMLInputElement>(null)
  const { user } = useUser();
  const userId = user?.id


  useEffect(() => {
    if (!userId) return;
    fetchPlaylists(userId)
  }, [fetchPlaylists, userId])

  const handleImageRef = (e: React.ChangeEvent<HTMLInputElement>):void => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {setImg(reader.result as string)}
    }
  }

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await postPlaylist(formPlaylist.name, formPlaylist.description, img);
      toast.success('Playlist created');
      setFormPlaylist({ name: '', description: '' });
      setImg('');
      const modal = document.getElementById('modal_createPlaylist') as HTMLDialogElement | null;
      modal?.close();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='h-full flex flex-col gap-y-2'>
      <div className='flex flex-col bg-[rgb(18,18,18)]/30 backdrop-blur-md z-10 rounded-lg px-3 py-5'>
        <Link to='/'>
          <span className='flex flex-row items-center font-bold text-zinc-200 gap-x-3 px-3 py-3 rounded-lg hover:bg-zinc-950'><House size={20}/><h1 className='hidden sm:block'>Home</h1></span>
        </Link>
        <SignedIn>
          <Link to='/chat'>
            <span className='flex flex-row items-center font-bold text-zinc-200 gap-x-3 px-3 py-3 rounded-lg hover:bg-zinc-950'><MessageCircle size={20}/><h1 className='hidden sm:block'>Messages</h1></span>
          </Link>
        </SignedIn>
      </div>
      <div className='flex-1 flex flex-col h-40 rounded-lg bg-[rgb(18,18,18)]/30 backdrop-blur-md px-3 py-5 gap-y-3'>
        <span className='flex flex-row items-center font-bold text-zinc-200 gap-x-3 px-3'><Library size={20}/><h1 className='hidden sm:block'>Playlist</h1></span>
        <button onClick={() => {const modal = document.getElementById('modal_createPlaylist') as HTMLDialogElement | null; modal?.showModal();}} className='w-full flex hover:bg-zinc-950 rounded-lg py-3 px-3 gap-x-2 mt-2 cursor-pointer'><CirclePlus /><h1 className='flex items-start '>New Playlist</h1></button>
        <div className='flex-1 flex flex-col min-h-0 overflow-auto'>
          {isLoadingFetch ? (
            <PlaylistSkeletons/>
          ) : (
            playlists.map((pl, index) => (
              <PlaylistItem playlist={pl} key={index}/>
            ))
          )}
        </div>
      </div>
      {/* MODAL */}
      <dialog id="modal_createPlaylist" className='modal'>
        <div className='modal-box p-4 pt-4 flex flex-col rounded-xl max-w-md  md:max-w-screen-sm bg-[rgb(18,18,18)]'>
          <form method="dialog">
          </form>
          <div>
            <div className='flex flex-col gap-y-4'>
              <h1 className='font-bold text-xl'>Create Playlist</h1>
              <form onSubmit={onSubmit} className='flex mt-2 flex-col overflow-hidden gap-y-5'>
                <input ref={imgRef} type='file' onChange={handleImageRef} hidden/>
                <input type='text' onChange={(e) => setFormPlaylist({ ...formPlaylist, [e.target.name]: e.target.value})} name='name' value={formPlaylist.name} className='py-2 border-b-2 focus:outline-none h-10 text-lg' placeholder='Title'/>
                <textarea onChange={(e) => setFormPlaylist({ ...formPlaylist, [e.target.name]: e.target.value})} name='description'  value={formPlaylist.description} className='py-2 border-b-2 focus:outline-none max-h-40 resize-none overflow-y-auto h-20 text-lg' placeholder='Description'/>
                <div className='flex flex-col h-96 items-center justify-center border border-dashed rounded-md border-green-700 mt-5 relative'>
                  {!img ? (
                    <>
                      <FileUp size={40} className='mb-2 text-zinc-400'/>
                      <h1 className='text-zinc-400'>Select Files</h1>
                      <button onClick={(e) => {e.preventDefault(), imgRef.current?.click()}} className='py-1.5 px-5 bg-green-600 rounded-md mt-2 cursor-pointer hover:bg-green-700'>Broser Files</button>
                    </>
                  ) : (
                      <div className='flex flex-col h-full w-4/5 p-2'>
                        <img src={img} className='rounded-md object-contain w-full h-full'/>
                        <X  onClick={() => setImg('')} className='h-[19px] w-[19px] md:h-[24px] md:w-[24px] absolute top-4 right-4  hover:text-white hover:bg-zinc-500/30 rounded-full cursor-pointer'/>
                      </div>
                  )}
                </div>
              </form>
            <div className='flex flex-row justify-end gap-x-3'>
              <form method="dialog" className="">
                <button className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-zinc-500 text-sm'>Cancel</button>
              </form>
              <button type='submit' onClick={onSubmit} disabled={!formPlaylist.name} className='py-1.5 px-5 bg-green-600 rounded-md cursor-pointer hover:bg-green-700 text-sm disabled:bg-green-900 disabled:cursor-default'>{isLoadingPost ? <Loader2Icon size={20} className='animate-spin '/> : 'Create'}</button>
            </div>
            </div>
          </div>
        </div>        
        <form method="dialog" className="modal-backdrop">
          <button className=''>close</button>
        </form>
      </dialog>
    </div>
  )
}
