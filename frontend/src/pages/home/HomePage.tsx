import { TopBar } from '@/components/TopBar'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react';
import { FeaturedSection } from './components/FeaturedSection';
import { MadeForYouSection } from './components/MadeForYouSection';
import { TrendingSongs } from './components/TrendingSongs';
import { usePlayerStore } from '@/stores/usePlayerStore';

export const HomePage = () => {

  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, featuredSongs, madeForYouSongs, trendingSongs} = useMusicStore();
  const { initializeQueue } = usePlayerStore();
  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [ fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (featuredSongs.length > 0 && madeForYouSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs]
      initializeQueue(allSongs);
    }
  }, [initializeQueue, featuredSongs, madeForYouSongs, trendingSongs])
  

  return (
    <main className='flex flex-col h-full bg-[rgb(18,18,18)]/30 rounded-lg overflow-hidden gap-y-3'>
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