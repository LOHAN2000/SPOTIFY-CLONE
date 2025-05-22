import { useMusicStore } from "@/stores/useMusicStore";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { Clock, Loader, Music, Pause, Play, Trash } from "lucide-react";
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

  const { fetchPlaylistById, playlist, deletePlayslistSong, isLoadingPlaylist } = usePlaylistStore();
  const { fetchAlbumById, album} = useMusicStore();

  const { currentSong, isPlaying, playCollection, togglePlay } = usePlayerStore();

  const isAlbumPage = pathname.includes('/album');
  const isPlaylistPage = pathname.includes('/playlist');

  const handlePlay = (index: number) => {
    const songs = isAlbumPage ? album?.song : playlist?.songs;
    if (songs) {
      playCollection(songs, index)
    }
  }

  const handleCollectionPlay = () => {
    const collection = isAlbumPage ? album?.song : playlist?.songs;
    const songs = isAlbumPage ? album?.song : playlist?.songs;
    const isCurrentCollectionPlaying = collection?.some(song => song.song_id === currentSong?.song_id)

    if (isCurrentCollectionPlaying) {
      togglePlay();
    } else {
      if (!songs) return;
      playCollection(songs, 0)
    }
  }

  useEffect(() => {
    if (!id) return;
    if (isPlaylistPage) fetchPlaylistById(id);
    if (isAlbumPage) fetchAlbumById(id);
  }, [id, fetchAlbumById, fetchPlaylistById, pathname])


  return (
    <>
    {isPlaylistPage ? (
      <div className="h-full">
      <div className="relative h-full">
        <div className="absolute inset-0 h-4/10 sm:h-2/10 md:h-3/12 lg:h-4/12 max-h-[550px] bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${playlist?.image_url || "/spotify-black.jpg"})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/1 opacity-90"></div>
        </div>
        <div className="relative flex flex-col h-full z-10 p-2 md:p-10 gap-y-0 sm:gap-y-3 bg-[rgb(18,18,18)]/30">
          <div className="flex flex-col sm:grid sm:grid-cols-[auto_8fr] gap-x-14 w-full sm:h-2/8 justify-center items-center">
            <div className="flex size-44 sm:size-52 md:size-70 max-w-80 mx-auto sm:mx-0 aspect-square">
              <img className="object-center object-cover w-full h-full rounded-lg aspect-square" src={playlist?.image_url || '/spotify-black.jpg'} alt="Playlist Cover" />
            </div>
            <div className="flex sm:flex-3/4 flex-col gap-y-1 sm:gap-y-5 sm:max-w-5/7  max-h-25 sm:max-h-74 sm:justify-end">
              <h1 className="text-sm sm:text-md lg:text-xl mt-3 sm:mt-0">{isAlbumPage ? 'Album' : 'Playlist'}</h1>
              <h1 className="font-bold text-2xl md:text-7xl">{playlist?.name}</h1>
              <div className="flex gap-x-3 items-center sm:mt-1">
                <h1 className="font-bold text-sm sm:text-lg">autor</h1>
                <h1 className="text-sm sm:text-lg">{playlist?.songs.length} Songs</h1>
              </div>
            </div>
          </div> 
          <div>
          <button onClick={handleCollectionPlay} className="mt-5 sm:mt-15 borderr rounded-full bg-green-500 hover:bg-green-400 sm:hover:scale-105 transition-all duration-500 cursor-pointer p-3 sm:p-6"> 
            {(isPlaying && playlist?.songs.some(song => song.song_id === currentSong?.song_id)) ? (
              <Pause size={27} color="black"/>
            ) : (
              <Play size={27} color="black"/>
            )}
          </button> 
          </div>
          <div className="flex flex-col mt-5 sm:mt-10  justify-center text-zinc-400 border-b border-white-/5 px-2">
            <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] text-sm md:text-xl">
              <div>#</div>
              <div>Title</div>
              <div className="overflow-hidden truncate">Released Date</div>
              <div><Clock/></div>
            </div>
          </div>
          <div className="flex flex-col h-full overflow-y-scroll">
            {playlist?.songs.map((song, index) => {
              const isCurrentSong = currentSong?.song_id === song.song_id;
              return(
                <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] hover:bg-white/5 cursor-pointer text-zinc-400 px-2 py-1 rounded-sm group items-center" key={song.song_id}>
                  <div className="text-sm md:text-lg py-3"><h1 className="group-hover:hidden">{index + 1}</h1><Play size={20} onClick={() => handlePlay(index)} className="hidden group-hover:block cursor-pointer"/></div>
                  <div className="flex flex-row items-center gap-x-2">
                    <div className="flex flex-1/12 sm:flex-none text-sm md:text-lg mx-auto items-center justify-center">
                      <img src={song.image_Url} className="size-8 sm:size-12 rounded-sm"/>
                    </div>
                    <div className="flex flex-1/2 flex-col">
                    <div className="text-sm md:text-lg flex items-center gap-x-2"><h1>{song.title}</h1>{isCurrentSong ? <Music size={13} className="sm:mt-1.5 text-emerald-500"/> : ''}</div>
                    <div className="text-sm md:text-lg"><h1>{song.artist}</h1></div>
                    </div>
                  </div>
                  <div className="text-sm md:text-lg py-3 ps-3"><h1>{song.created_at.split('T')[0]}</h1></div>
                  <div className="flex text-sm md:text-lg py-3 ps-4 space-x-2 items-center"><h1>{formatDuration(song.duration)}</h1>{isLoadingPlaylist ? <Loader className="size-4 animate-spin"/> : <Trash onClick={() => deletePlayslistSong(song.song_id, playlist.playlist_id)} className="size-4 hover:text-white"/>}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    ) : (
      <div className="h-full">
        <div className="relative h-full">
          <div className="absolute inset-0 h-4/10 sm:h-2/10 md:h-3/12 lg:h-4/12 max-h-[550px] bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${album?.imageUrl || "/spotify-black.jpg"})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/1 opacity-90"></div>
          </div>
          <div className="relative flex flex-col h-full z-10 p-2 md:p-10 gap-y-0 sm:gap-y-3 bg-[rgb(18,18,18)]/30">
            <div className="flex flex-col sm:grid sm:grid-cols-[auto_8fr] gap-x-14 w-full sm:h-2/8 justify-center items-center">
              <div className="flex size-44 sm:size-52 md:size-70 max-w-80 mx-auto sm:mx-0 aspect-square">
                <img className="object-center object-cover w-full h-full rounded-lg aspect-square" src={album?.imageUrl || '/spotify-black.jpg'} alt="Playlist Cover" />
              </div>
              <div className="flex sm:flex-3/4 flex-col gap-y-1 sm:gap-y-5 sm:max-w-5/7  max-h-25 sm:max-h-74 sm:justify-end">
                <h1 className="text-sm sm:text-md lg:text-xl mt-3 sm:mt-0">{isAlbumPage ? 'Album' : 'Playlist'}</h1>
                <h1 className="font-bold text-2xl md:text-7xl">{album?.title}</h1>
                <div className="flex gap-x-3 items-center sm:mt-1">
                  <h1 className="font-bold text-sm sm:text-lg">{album?.artist}</h1>
                  <h1 className="text-sm sm:text-lg">{album?.song.length} Songs</h1>
                  <h1 className="text-sm sm:text-lg">{album?.releaseYear}</h1>
                </div>
              </div>
            </div> 
            <div>
              <button onClick={handleCollectionPlay} className="mt-5 sm:mt-15 borderr rounded-full bg-green-500 hover:bg-green-400 sm:hover:scale-105 transition-all duration-500 cursor-pointer p-3 sm:p-6"> 
                {(isPlaying && album?.song.some(song => song.song_id === currentSong?.song_id)) ? (
                  <Pause size={27} color="black"/>
                ) : (
                  <Play size={27} color="black"/>
                )}
              </button> 
            </div>
            <div className="flex flex-col mt-5 sm:mt-10 bg-black/40 backdrop:backdrop-blur-sm justify-center text-zinc-400 border-b border-white-/5 px-2">
              <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] text-sm md:text-xl">
                <div>#</div>
                <div>Title</div>
                <div className="overflow-hidden truncate">Released Date</div>
                <div><Clock/></div>
              </div>
            </div>
            <div className="flex flex-col h-4/6 overflow-y-scroll">
              {album?.song.map((song, index) => {
                const isCurrentSong = currentSong?.song_id === song.song_id;
                return(
                  <div className="grid grid-cols-[15px_6fr_2fr_1fr] sm:grid-cols-[30px_5fr_2fr_1fr] hover:bg-white/5 cursor-pointer text-zinc-400 px-2 py-1 rounded-sm group items-center" key={song.song_id}>
                    <div className="text-sm md:text-lg py-3"><h1 className="group-hover:hidden">{index + 1}</h1><Play size={20} onClick={() => handlePlay(index)} className="hidden group-hover:block cursor-pointer"/></div>
                    <div className="flex flex-row items-center gap-x-2">
                      <div className="flex flex-1/12 sm:flex-none text-sm md:text-lg mx-auto items-center justify-center">
                        <img src={song.image_Url} className="size-8 sm:size-12 rounded-sm"/>
                      </div>
                      <div className="flex flex-1/2 flex-col">
                      <div className="text-sm md:text-lg flex items-center gap-x-2"><h1>{song.title}</h1>{isCurrentSong ? <Music size={13} className="sm:mt-1.5 text-emerald-500"/> : ''}</div>
                      <div className="text-sm md:text-lg"><h1>{song.artist}</h1></div>
                      </div>
                    </div>
                    <div className="text-sm md:text-lg py-3 ps-3"><h1>{album.releaseYear}</h1></div>
                    <div className="text-sm md:text-lg py-3 ps-4"><h1>{formatDuration(song.duration)}</h1></div>
                  </div>
                )
              })}
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
