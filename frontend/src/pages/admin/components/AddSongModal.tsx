import { useMusicStore } from '@/stores/useMusicStore'
import { Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

export const AddSongModal = () => {

  const { albums } = useMusicStore();

  const [ files, setFiles ] = useState<{ audio: File | null; image: string | null}>({
    audio: null,
    image: null
  })

  const audioRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setFiles((prev) => ({ ...prev, image: reader.result as string}))
    }
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
          {files.image ? (
            <div className='relative flex items-center w-full h-60 py-1'>
              <img src={files.image} className=' object-contain h-full w-full rounded-md'/>
              <X onClick={() => setFiles((prev) => ({ ...prev, image: null}))} className='absolute -right-6 top-2 z-100 cursor-pointer'/>
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
          <button  onClick={() => audioRef.current?.click()} className='flex items-center justify-center bg-black/60 py-1.5 rounded-xs text-zinc-300 cursor-pointer'>{ 'Choose Audio File'}</button>
        </div>
        {/* form input */}
        <form className='flex flex-col'>
          <label className='font-semibold'>Song Title:</label>
          <input type='text' className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          <label className='mt-3 font-semibold'>Artist:</label>
          <input type='text' className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          <label className='mt-3 font-semibold'>Duration (seconds):</label>
          <input type='text' className='bg-black/60 outline-none py-1.5 px-2 text-zinc-300 rounded-xs mt-1'/>
          <label className='mt-3 font-semibold'>Album (optional)</label>
          <select defaultValue="Select album" className="select bg-black/60 flex w-full outline-none select-secondary mt-1 px-2 py-1.5">
            <option disabled={true}>Select album</option>
            {albums.map((album) => (
              <option  className='bg-black' key={album.album_id}>{album.title}</option>
            ))}
          </select>
        </form>
        <div className='flex justify-end items-center mt-2'>
          <form method="dialog" className="">
            <button className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-zinc-800/50 text-sm'>Cancel</button>
          </form>
          <button className='py-1.5 px-5 rounded-md cursor-pointer hover:bg-emerald-400 bg-emerald-500 text-black font-semibold text-sm'>Add Song</button>
        </div>
      </div>
    </div>        
    <form method="dialog" className="modal-backdrop">
      <button className=''>close</button>
    </form>
  </dialog>
  )
}
