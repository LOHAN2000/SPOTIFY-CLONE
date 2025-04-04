import { useMusicStore } from "@/stores/useMusicStore"
import { Link } from "react-router-dom";
import { PlayButton } from "./PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";

export const MadeForYouSection = () => {

  const { madeForYouSongs } = useMusicStore();
  const { currentSong } = usePlayerStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-x-5 items-center justify-center">
      {madeForYouSongs.map((song) => {
        const isCurrentSong = currentSong?.song_id === song.song_id;
        return(
          <div key={song.song_id} className="flex flex-col bg-zinc-800/10 hover:bg-zinc-800/50 rounded-md overflow-hidden max-w-100 justify-center gap-y-1 transition-colors pb-1 group">
            <div className="w-full relative overflow-hidden">
              <img src={song.image_Url} className="h-full w-full object-cover object-center duration-300 transition-transform group-hover:scale-110"/>
              <div className={`absolute right-2 bottom-2 ${isCurrentSong ? 'block' : 'hidden'} group-hover:block transition-all`}>
                <PlayButton song={song}/>
              </div>
            </div>
            <div className="flex flex-col items-start justify-start ps-2">
              <Link to={`/album/${song.album_id}`}>
                <h1 className="font-semibold text-zinc-100 cursor-pointer hover:underline">{song.album_title}</h1>
              </Link>
              <h1 className="text-sm text-zinc-400">{song.artist}</h1>
            </div>
        </div>
        )
      })}
    </div>
  )
}
