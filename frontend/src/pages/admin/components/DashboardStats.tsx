import { useMusicStore } from '@/stores/useMusicStore'
import React from 'react'
import { StatsCard } from './StatsCard';

export const DashboardStats = () => {

  const {stats} = useMusicStore();

  return (
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
      <StatsCard type={'album'} total={stats.totalAlbums}/>
      <StatsCard type={'artist'} total={stats.totalArtists}/>
      <StatsCard type={'song'} total={stats.totalSongs}/>
      <StatsCard type={'user'} total={stats.totalUsers}/>
    </div>
  )
}
