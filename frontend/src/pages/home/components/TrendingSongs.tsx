import { useMusicStore } from "@/stores/useMusicStore"
import { Play } from "lucide-react";

export const TrendingSongs = () => {

  const { trendingSongs } = useMusicStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-5 items-center justify-center ">
      {trendingSongs.map((song) => (
        <div key={song.song_id} className="flex flex-col bg-zinc-800/10 hover:bg-zinc-800/50 rounded-md overflow-hidden max-w-100 justify-center gap-y-1 transition-colors pb-1 group">
          <div className="w-full relative overflow-hidden">
            <img src={song.image_Url} className="h-full w-full object-cover object-center duration-300 transition-transform group-hover:scale-110"/>
            <div className="absolute right-2 bottom-2 hidden group-hover:block transition-all">
              <button className="bg-emerald-500 p-1.5 rounded-sm cursor-pointer"><Play size={24}/></button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start ps-2">
            <h1 className="font-semibold text-zinc-100">{song.title}</h1>
            <h1 className="text-sm text-zinc-400">{song.artist}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
