import { SignedIn, SignedOut, SignOutButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom'
import { SignInOutButtons } from './SignInOutButtons';

export const TopBar = () => {

  const isAdmin: boolean = false;


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
      <div>
        {isAdmin && (
          <Link to='/admin'>
            <LayoutDashboardIcon className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7'/>
          </Link>
        )}

        <SignedIn>
          <SignOutButton></SignOutButton>
        </SignedIn>

        <SignedOut>
          <SignInOutButtons/>
        </SignedOut>
      </div>
    </div>
  )
}
