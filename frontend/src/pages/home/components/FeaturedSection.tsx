import { FeaturedGridSkeleton } from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore"
import { PlayButton } from "./PlayButton";
import { usePlayerStore } from "@/stores/usePlayerStore";

export const FeaturedSection = () => {

  const { featuredSongs, error, isLoading } = useMusicStore();
  const { currentSong } = usePlayerStore();

  if (isLoading) {
    return( 
      <FeaturedGridSkeleton/>
    )
  }
 
  if (error) {
    return (
      //@ts-ignore
      <p>{error}</p>
    )
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {featuredSongs.map((song) => {
          const isCurrentSong = currentSong?.song_id === song.song_id;
        return(
          <div key={song.song_id} className="grid grid-cols-[auto_2fr] items-center bg-zinc-800/30 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors cursor-pointer relative gap-x-2 group">
          <div className="size-15 sm:size-20">
            <img src={song.image_Url} className="w-full h-full object-cover object-center"/>
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h1 className="font-medium truncate">{song.title}</h1>
            <h1 className="text-sm text-zinc-400 truncate">{song.artist}</h1>
          </div>
          <div className={`absolute right-2 bottom-2 ${isCurrentSong ? 'block' : 'hidden'} group-hover:block transition-all`}>
            <PlayButton song={song}/>
          </div>
        </div>
        )
      })}
    </div>
  )
}
