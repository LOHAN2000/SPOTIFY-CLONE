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
    <div className='min-h-screen bg-[rgb(18,18,18)]/30 text-zinc-100 p-8'>
      <HeaderAdmin/>
      <DashboardStats/>
      <Tabs defaultValue='songs' className='space-y-6'>
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
        <TabsContent value='songs'>
          <SongsTabContent/>
        </TabsContent>
        <TabsContent value='albums'>
          <AlbumsTabContent/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
