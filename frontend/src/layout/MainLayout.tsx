import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom';
import { LeftSideBar } from './components/LeftSideBar';
import { FriendsActivity } from './components/FriendsActivity';
import { AudioPlayer } from './components/AudioPlayer';
import { PlaybackControls } from './components/PlaybackControls';
import { useEffect, useState } from 'react';

export const MainLayout = () => {

  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile();
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className='h-screen flex flex-col bg-black text-white p-2'>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden '>
        <ResizablePanel defaultSize={15} minSize={isMobile ? 0 : 14}>
          <LeftSideBar/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        <ResizablePanel defaultSize={isMobile ? 80 : 70}>
          <Outlet/>
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

            <ResizablePanel defaultSize={15} minSize={9} maxSize={25} collapsedSize={8}>
              <FriendsActivity/>
            </ResizablePanel>
          </>
        )} 
      </ResizablePanelGroup>
      <PlaybackControls/>
      <AudioPlayer/>
    </div>
  )
}
