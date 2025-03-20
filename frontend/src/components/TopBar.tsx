import { SignedIn, SignedOut, SignOutButton, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom'
import { SignInOutButtons } from './SignInOutButtons';
import { useAuthStore } from '@/stores/useAuthStore';

export const TopBar = () => {

  const { isAdmin } = useAuthStore();
  
  return (
    <div className='flex flex-row sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10 w-full justify-between items-center py-3 px-4'>
      <Link to='/'>
        <div className='flex flex-row items-center gap-x-2'>
          <div className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8'>
            <img src='/spotify.png'/>
          </div>
          <h1 className='text-sm md:text-md lg:text-xl'>Spotify</h1>
        </div>
      </Link>
      <div className='flex flex-row gap-x-3'>
        {isAdmin && (
          <Link to='/admin'>
            <div className='flex flex-row border bg-black items-center p-2 gap-x-1 hover:bg-zinc-800/40'>
              <LayoutDashboardIcon className='w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5'/>
              <h1 className='hidden sm:block text-sm font-semibold'>Admin Dashboard</h1>
            </div>
          </Link>
        )}
        <SignedIn>
          <SignOutButton></SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInOutButtons/>
        </SignedOut>
        <UserButton/>
      </div>
    </div>
  )
}
