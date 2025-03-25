import { useMusicStore } from "@/stores/useMusicStore";
import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { Clock, Play } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const Collection = () => {

  const { pathname } = useLocation();
  const { id } = useParams();

  const { fetchPlaylistById, playlist } = usePlaylistStore();
  const { fetchAlbumById, album} = useMusicStore();

  const isAlbumPage = pathname.includes('/album');
  const isPlaylistPage = pathname.includes('/playlist');

  useEffect(() => {
    if (!id) return;
    if (isPlaylistPage) fetchPlaylistById(id);
    if (isAlbumPage) fetchAlbumById(id);
  }, [id, fetchAlbumById, fetchPlaylistById, pathname])


  return (
    <>
    {isPlaylistPage ? (
      <div className="h-full min-h-screen relative rounded-lg overflow-hidden">
        <div className="relative min-h-full rounded-lg ">
          <div className="absolute inset-0 h-4/10 sm:h-2/10 md:h-3/12 lg:h-4/12 max-h-[550px] bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${playlist?.image_url || "/spotify-black.jpg"})`}}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/1 opacity-90"></div>
          </div>
          <div className="relative flex flex-col h-screen z-10 p-2 md:p-10 gap-y-3">
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <div className="w-30 sm:w-36 md:w-54 lg:w-90 max-w-3xl h-full min-w-8">
                <img className="object-cover w-full h-full" src={playlist?.image_url || '/spotify-black.jpg'} alt="Playlist Cover" />
              </div>
              <div className="flex flex-col gap-y-1 sm:gap-y-5 max-w-5/7 sm:max-w-full max-h-25 sm:max-h-74 overflow-y-scroll sm:justify-end">
                <h1 className="text-sm sm:text-md lg:text-lg">{isAlbumPage ? 'Album' : 'Playlist'}</h1>
                <h1 className="font-bold text-2xl md:text-7xl sm:mt-1">{playlist?.name}</h1>
                <div className="flex gap-x-3 items-center ju sm:mt-1">
                  <h1 className="font-bold text-sm sm:text-lg">autor</h1>
                  <h1 className="text-sm sm:text-lg">{playlist?.songs.length} Songs</h1>
                </div>
                <p className="text-xs md:text-sm lg:text-lg">{playlist?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis dolor velit sapiente mollitia aliquam numquam illo delectus rem eum.</p>
              </div>
            </div> 
            <div>
              <button className="mt-15 borderr rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer p-6 "> 
                <Play size={27} color="black"/>
              </button> 
            </div>
            <div className="flex flex-col mt-10 bg-black/40 backdrop:backdrop-blur-sm justify-center text-zinc-400 border-b border-white-/5 px-2">
              <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] text-sm md:text-xl">
                <div>#</div>
                <div>Title</div>
                <div>Date added</div>
                <div><Clock/></div>
              </div>
            </div>
            <div className="flex flex-col h-4/6 overflow-y-scroll">
              {playlist?.songs.map((song, index) => (
                <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] hover:bg-white/5 cursor-pointer text-zinc-400 px-2 py-1 rounded-sm group items-center" key={song.song_id}>
                  <div className="text-sm md:text-lg py-3"><h1 className="group-hover:hidden">{index + 1}</h1><Play size={20} className="hidden group-hover:block"/></div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="text-sm md:text-lg">
                      <img src={song.image_Url} className="size-12 rounded-sm"/>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm md:text-lg"><h1>{song.title}</h1></div>
                      <div className="text-sm md:text-lg"><h1>{song.artist}</h1></div>
                    </div>
                  </div>
                  <div className="text-sm md:text-lg py-3 ps-3"><h1>{song.created_at.split('T')[0]}</h1></div>
                  <div className="text-sm md:text-lg py-3 ps-4"><h1>{formatDuration(song.duration)}</h1></div>
                </div>
              ))}
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    ) : (
      <div className="h-full">
        <div className="relative min-h-full">
          <div className="absolute inset-0 h-4/10 sm:h-2/10 md:h-3/12 lg:h-4/12 max-h-[550px] bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${album?.imageUrl || "/spotify-black.jpg"})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/1 opacity-90"></div>
          </div>
          <div className="relative flex flex-col h-screen z-10 p-2 md:p-10 gap-y-3">
            <div className="flex flex-col sm:flex-row gap-6 w-full">
              <div className="w-30 sm:w-36 md:w-54 lg:w-90 max-w-3xl h-full min-w-8">
                <img className="object-cover w-full h-full" src={album?.imageUrl || '/spotify-black.jpg'} alt="Playlist Cover" />
              </div>
              <div className="flex flex-col gap-y-1 sm:gap-y-5 max-w-5/7 sm:max-w-full max-h-25 sm:max-h-74 overflow-y-scroll sm:justify-end">
                <h1 className="text-sm sm:text-md lg:text-lg">{isAlbumPage ? 'Album' : 'Playlist'}</h1>
                <h1 className="font-bold text-2xl md:text-7xl sm:mt-1">{album?.title}</h1>
                <div className="flex gap-x-3 items-center ju sm:mt-1">
                  <h1 className="font-bold text-sm sm:text-lg">{album?.artist}</h1>
                  <h1 className="text-sm sm:text-lg">{album?.song.length} Songs</h1>
                  <h1 className="text-sm sm:text-lg">{album?.releaseYear}</h1>
                </div>
              </div>
            </div> 
            <div>
              <button className="mt-15 borderr rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer p-6 "> 
                <Play size={30} color="black"/>
              </button> 
            </div>
            <div className="flex flex-col mt-10 bg-black/40 backdrop:backdrop-blur-sm justify-center text-zinc-400 border-b border-white-/5 px-2">
              <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] text-sm md:text-xl">
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div><Clock/></div>
              </div>
            </div>
            <div className="flex flex-col h-4/6 overflow-y-scroll">
              {album?.song.map((song, index) => (
                <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] hover:bg-white/5 cursor-pointer text-zinc-400 px-2 py-1 rounded-sm group items-center" key={song.song_id}>
                  <div className="text-sm md:text-lg py-3"><h1 className="group-hover:hidden">{index + 1}</h1><Play size={20} className="hidden group-hover:block"/></div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="text-sm md:text-lg">
                      <img src={song.image_Url} className="size-12 rounded-sm"/>
                    </div>
                    <div className="flex flex-col">
                      <div className="text-sm md:text-lg"><h1>{song.title}</h1></div>
                      <div className="text-sm md:text-lg"><h1>{song.artist}</h1></div>
                    </div>
                  </div>
                  <div className="text-sm md:text-lg py-3 ps-3"><h1>{album.releaseYear}</h1></div>
                  <div className="text-sm md:text-lg py-3 ps-4"><h1>{formatDuration(song.duration)}</h1></div>
                </div>
              ))}
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
