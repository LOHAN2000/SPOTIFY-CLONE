import { useAuthStore } from '@/stores/useAuthStore'
import { UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom'

export const HeaderAdmin = () => {

  const { isAdmin } = useAuthStore();

  return (
    <div className='flex flex-row sticky top-0  backdrop-blur-md z-10 w-full justify-between items-center py-3 px-4'>
      <Link to='/'>
        <div className='flex flex-row items-center gap-x-2'>
          <div className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7'>
            <img src='/spotify.png'/>
          </div>
          <h1 className='text-sm md:text-md lg:text-lg'>Spotify</h1>
        </div>
      </Link>
      <UserButton/>
    </div>
  )
}
