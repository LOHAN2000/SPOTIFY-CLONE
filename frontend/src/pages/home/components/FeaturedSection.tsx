import { FeaturedGridSkeleton } from "@/components/skeletons/FeaturedGridSkeleton";
import { useMusicStore } from "@/stores/useMusicStore"

export const FeaturedSection = () => {

  const { featuredSongs, error, isLoading } = useMusicStore();



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
    <div>FeaturedSection</div>
  )
}
