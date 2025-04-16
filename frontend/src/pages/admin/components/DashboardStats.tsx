import { useMusicStore } from '@/stores/useMusicStore'
import { StatsCard } from './StatsCard';

export const DashboardStats = () => {

  const {stats} = useMusicStore();
  type StatsType = "albums" | "artists" | "songs" | "users";

  const statsArray: { type: StatsType; total: number; bgcolor: string; iconColor: string}[] = [
    { type: "albums", total: stats.totalAlbums, bgcolor: 'bg-emerald-500/10', iconColor: 'text-emerald-500'},
    { type: "artists", total: stats.totalArtists, bgcolor: 'bg-violet-500/10', iconColor: 'text-violet-500'},
    { type: "songs", total: stats.totalSongs, bgcolor: 'bg-orange-500/10', iconColor: 'text-orange-500'},
    { type: "users", total: stats.totalUsers, bgcolor: 'bg-sky-500/10', iconColor: 'text-sky-500'}
  ]

  return (
    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-x-5 my-4 mb-6'>
      {statsArray.map((stat, index) => (
        <div key={index} className='flex justify-center'>
          <StatsCard type={stat.type} total={stat.total} color={stat.bgcolor} iconColor={stat.iconColor}/>
        </div>
      ))}
    </div>
  )
}
