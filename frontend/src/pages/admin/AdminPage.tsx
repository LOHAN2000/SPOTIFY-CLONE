import { HeaderAdmin } from './components/HeaderAdmin'
import { DashboardStats } from './components/DashboardStats'
import { Album, Music } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SongsTabContent } from './components/SongsTabContent'
import { AlbumsTabContent } from './components/AlbumsTabContent'
import { useMusicStore } from '@/stores/useMusicStore'
import { useEffect } from 'react'

export const AdminPage = () => {

  const { fetchSongs, fetchStats, isLoading, fetchAlbums } = useMusicStore();

  useEffect(() => {
    fetchSongs();
    fetchStats();
    fetchAlbums();
  }, [fetchSongs, fetchStats, fetchAlbums])


  return (
    <div className='h-screen bg-[rgb(18,18,18)]/30 text-zinc-100 p-8'>
      <div className='flex flex-col h-full overflow-hidden '>
      <HeaderAdmin/>
      <DashboardStats/>
      <Tabs defaultValue='songs' className='flex flex-col space-y-6 h-full overflow-hidden'>
        <TabsList className='grid grid-cols-2 max-w-xs bg-zinc-800/50'>
          <TabsTrigger value='songs' className='flex items-center gap-x-2 data-[state=active]:bg-zinc-700/50'>
            <Music className='size-5'/>
            Songs
          </TabsTrigger>
          <TabsTrigger value='albums' className='flex items-center gap-x-2 data-[state=active]:bg-zinc-700/50'>
            <Album className='size-5'/>
            Album
          </TabsTrigger>
        </TabsList>
        <TabsContent value='songs' className='h-full overflow-hidden'>
          <SongsTabContent/>
        </TabsContent>
        <TabsContent value='albums' className=''>
          <AlbumsTabContent/>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
