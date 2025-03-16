import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { Outlet } from 'react-router-dom';
import { LeftSideBar } from './components/LeftSideBar';

export const MainLayout = () => {

  const isMobile: boolean = false;
  return (
    <div className='h-screen flex flex-col bg-black text-white '>
      <ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
        <ResizablePanel defaultSize={15} minSize={isMobile ? 0 : 10}>
          <LeftSideBar/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        <ResizablePanel defaultSize={isMobile ? 80 : 70}>
          <Outlet/>
        </ResizablePanel>

        <ResizableHandle className='w-2 bg-black rounded-lg transition-colors'/>

        <ResizablePanel defaultSize={15} minSize={0} maxSize={25} collapsedSize={0}>
          Right
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
