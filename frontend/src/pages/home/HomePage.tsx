import { TopBar } from '@/components/TopBar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react';
import { FeaturedSection } from './components/FeaturedSection';

export const HomePage = () => {

  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, isLoading, featuredSongs, madeForYouSongs, trendingSongs } = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  console.log(featuredSongs, madeForYouSongs, trendingSongs);

  return (
    <div className='rounded-lg overflow-hidden'>
      <TopBar/>
      <FeaturedSection/>
    </div>
  )
}