import { useMusicStore } from '@/stores/useMusicStore'
import { NewAlbum } from '@/types';
import { Loader2, Upload, X } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';

export const AddAlbumModal = () => {
  
  const { postNewAlbum } = useMusicStore();

  const [ newAlbum, setNewAlbum ] = useState<NewAlbum>({
      title: '',
      artist: '',
      releaseYear: ''
  })

  const [ file, setFiles ] = useState<{image: string | null | File}>({
    image: null
  })

  const [ isLoading, setIsLoading ] = useState<Boolean>(false)
  const [ img, setImg ] = useState<string>('')

  const imageRef = useRef<HTMLInputElement>(null);


  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => ({ ...prev, image: e.target.files![0]}))
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setImg(reader.result as string)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
      if (!file.image) return toast.error('Please upload image file');

      const formData = new FormData();

      formData.append('title', newAlbum.title);
      formData.append('artist', newAlbum.artist);
      formData.append('releaseYear', newAlbum.releaseYear);
      formData.append('imageFile', file.image);

      await postNewAlbum(formData);

      setIsLoading(false)
      const modal = document.getElementById('modal_addAlbum') as HTMLDialogElement | null;
      modal?.close();
      
      setNewAlbum({
				title: "",
				artist: "",
				releaseYear: "",
			});

			setFiles({
				image: null,
			});
  }

  return (
    <dialog id="modal_addAlbum" className='modal'>
      <div className='modal-box p-4 pt-4 flex flex-col rounded-xl max-w-md md:max-w-screen-sm bg-[rgb(18,18,18)]'>
        <form method="dialog" className='flex justify-end  items-center absolute right-3 top-3'>
          <button className='cursor-pointer'><X className='size-5'/></button>
        </form>
        <div className='flex flex-col space-y-3'>
          <header className='flex flex-col'>
            <h1 className='font-bold text-2xl'>Add New Song</h1>
            <p className='text-lg text-zinc-400'>Add a new song to your music library</p>
          </header>
          {/* image handler */}
          <div className='flex flex-col h-full max-h-60 p-7 border border-dashed items-center justify-center space-y-0'>
            {img ? (
              <div className='relative flex items-center w-full h-60 py-1'>
                <img src={img} className=' object-contain h-full w-full rounded-md'/>
                <X onClick={() => {setFiles((prev) => ({ ...prev, image: null})), setImg('')}} className='absolute -right-6 top-2 z-100 cursor-pointer'/>
              </div>
            ) : (
              <>
                <Upload onClick={() => imageRef.current?.click()} className='p-3 size-13 bg-zinc-800 rounded-full cursor-pointer'/>
                <p className='text-zinc-400 mt-1'>Upload artwork</p>
              </>
            )}
            <input type='file' accept='image/*' hidden ref={imageRef} onChange={handleImage}/>
          </div>
          {/* form input */}
          <form onSubmit={handleSubmit} id='formAlbum' className='flex flex-col'>
            <label className='font-semibold'>Album Title:</label>
            <input type='text' onChange={(e) => setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value})} name='title' value={newAlbum.title} className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
            <label className='mt-3 font-semibold'>Artist:</label>
            <input type='text' onChange={(e) => setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value})} name='artist' value={newAlbum.artist} className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
            <label className='mt-3 font-semibold'>Release Year:</label>
            <input type='text' onChange={(e) => setNewAlbum({ ...newAlbum, [e.target.name]: e.target.value || '0'})} name='releaseYear' value={newAlbum.releaseYear} className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          </form>
          <div className='flex justify-end items-center mt-2 space-x-2'>
            <form method="dialog" className="">
              <button className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-zinc-800/50 text-sm text-zinc-400'>Cancel</button>
            </form>
            <button type='submit' form='formAlbum' disabled={!newAlbum.title || !newAlbum.artist || !file.image} className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-emerald-400 bg-emerald-500 text-black font-semibold text-sm disabled:cursor-default'>{isLoading ? <Loader2 className='animate-spin size-4.5'/> : 'Add Album'}</button>
          </div>
        </div>
      </div>        
    </dialog>
  )
}
