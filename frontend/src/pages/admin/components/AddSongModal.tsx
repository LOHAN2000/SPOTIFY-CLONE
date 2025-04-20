import { useMusicStore } from '@/stores/useMusicStore'
import { NewSong } from '@/types';
import { Loader2, Upload, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

export const AddSongModal = () => {

  const { albums, postNewSong } = useMusicStore();

  const [ newSong, setNewSong ] = useState<NewSong>({
    title: '',
    artist: '',
    album: '',
    duration: '0'
  })

  const [ files, setFiles ] = useState<{ audio: File | null; image: string | null | File}>({
    audio: null,
    image: null
  })

  const [ isLoading, setIsLoading ] = useState<Boolean>(false)
  const [ img, setImg ] = useState<string>('')

  const audioRef = useRef<HTMLInputElement>(null);
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
      if (!files.audio || !files.image) return toast.error('Please upload both audio and image files');

      const formData = new FormData();

      formData.append('title', newSong.title);
      formData.append('artist', newSong.artist);
      formData.append('duration', newSong.duration);
      formData.append('albumId', newSong.album);
      formData.append('audioFile', files.audio);
      formData.append('imageFile', files.image);

      await postNewSong(formData)
      setIsLoading(false)
      const modal = document.getElementById('modal_addSong') as HTMLDialogElement | null;
      modal?.close();
      
      setNewSong({
				title: "",
				artist: "",
				album: "",
				duration: "0",
			});

			setFiles({
				audio: null,
				image: null,
			});
  }

  return (
    <dialog id="modal_addSong" className='modal'>
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
        {/* audio handler */}
        <div className='flex flex-col space-y-2 '>
          <h1 className='font-semibold'>Audio File</h1>
          <input type='file' accept='audio/*' hidden ref={audioRef} onChange={(e) => setFiles((prev) => ({ ...prev, audio: e.target.files![0]}))}/>
          <button  onClick={() => audioRef.current?.click()} className='flex items-center justify-center bg-black/60 py-1.5 rounded-xs text-zinc-300 cursor-pointer'>{files.audio ? files.audio.name.slice(0, 100) : 'Choose Audio File'}</button>
        </div>
        {/* form input */}
        <form onSubmit={handleSubmit} id='formSong' className='flex flex-col'>
          <label className='font-semibold'>Song Title:</label>
          <input type='text' onChange={(e) => setNewSong({ ...newSong, [e.target.name]: e.target.value})} name='title' value={newSong.title} className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          <label className='mt-3 font-semibold'>Artist:</label>
          <input type='text' onChange={(e) => setNewSong({ ...newSong, [e.target.name]: e.target.value})} name='artist' value={newSong.artist} className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          <label className='mt-3 font-semibold'>Duration (seconds):</label>
          <input type='text' onChange={(e) => setNewSong({ ...newSong, [e.target.name]: e.target.value || '0'})} name='duration' value={newSong.duration} className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          <label className='mt-3 font-semibold'>Album (optional):</label>
          <select onChange={(e) => setNewSong({ ...newSong, album: e.target.value})} defaultValue="Select album" className="select bg-black/60 flex w-full outline-none select-secondary mt-1 px-2 py-1.5">
            <option disabled={false} >Select album</option>
            {albums.map((album) => (
              <option  className='bg-black' key={album.album_id} value={album.album_id}>{album.title}</option>
            ))}
          </select>
        </form>
        <div className='flex justify-end items-center mt-2 space-x-2'>
          <form method="dialog" className="">
            <button className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-zinc-800/50 text-sm text-zinc-400'>Cancel</button>
          </form>
          <button type='submit' form='formSong' disabled={!newSong.title || !newSong.artist || !newSong.duration} className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-emerald-400 bg-emerald-500 text-black font-semibold text-sm disabled:cursor-default'>{isLoading ? <Loader2 className='animate-spin size-4.5'/> : 'Add Song'}</button>
        </div>
      </div>
    </div>        
  </dialog>
  )
}
