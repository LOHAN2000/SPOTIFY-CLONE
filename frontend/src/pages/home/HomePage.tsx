import { TopBar } from '@/components/TopBar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react';
import { FeaturedSection } from './components/FeaturedSection';
import { MadeForYouSection } from './components/MadeForYouSection';
import { TrendingSongs } from './components/TrendingSongs';

export const HomePage = () => {

  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs} = useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [ fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);


  return (
    <main className='flex flex-col h-full bg-black rounded-lg overflow-hidden gap-y-3'>
      <TopBar/>
      <div className='flex flex-col h-full overflow-y-auto gap-y-10 px-4'>
        <h1 className='font-bold text-4xl'>Good Afternoon</h1>
        <FeaturedSection/>
        <h1 className='font-bold text-4xl'>Made for You</h1>
        <MadeForYouSection/>
        <h1 className='font-bold text-4xl'>Trending Songs</h1>
        <TrendingSongs/>
      </div>
    </main>
  )
}