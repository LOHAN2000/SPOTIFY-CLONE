import { usePlaylistStore } from "@/stores/usePlaylistStore";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom"

export const Collection = () => {

  const { pathname } = useLocation();
  const { id } = useParams();

  const { fetchPlaylistById, playlist } = usePlaylistStore();

  const isAlbumPage = pathname.includes('/album');
  const isPlaylistPage = pathname.includes('/playlist');

  useEffect(() => {
    if (!id) return;
    fetchPlaylistById(id);
  }, [id])

  console.log(playlist)
  console.log(id)

  return (
    <div className="h-full">
      <div className="relative min-h-full">
        <div className="absolute inset-0 h-3/9 sm:h-3/7 bg-cover bg-center filter blur-lg" style={{ backgroundImage: `url(${playlist?.image_url || "/spotify-black.jpg"})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/1 opacity-90"></div>
        </div>
        <div className="relative z-10 ">
          <div className="flex flex-col sm:flex-row p-15 gap-6 pb-8">
            <div className="w-30 sm:w-36 md:w-54 lg:w-62 max-w-2xl h-full min-w-8">
              <img className="object-cover w-full h-full" src={playlist?.image_url || '/spotify-black.jpg'} alt="Playlist Cover" />
            </div>
            <div className="flex flex-col gap-y-1 sm:gap-y-3 max-w-6/7 sm:max-w-3/5 max-h-25 sm:max-h-60  overflow-y-scroll sm:justify-end">
              <h1>{isAlbumPage ? 'Album' : 'Playlist'}</h1>
              <h1 className="font-bold text-2xl md:text-6xl sm:mt-1">{playlist?.name}</h1>
              <div className="flex gap-x-3 items-center sm:mt-4 ">
                <h1 className="font-bold text-sm ">autor</h1>
                <h1 className="text-sm">{playlist?.songs.length}</h1>
              </div>
              <p className="text-xs md:text-sm ">{playlist?.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam quis dolor velit sapiente mollitia aliquam numquam illo delectus rem eum.</p>
            </div>
          </div>  
        </div>
      </div>
    </div>
  );
}
