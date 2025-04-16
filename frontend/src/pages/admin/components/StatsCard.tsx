import React from 'react'
import { ListMusicIcon, Users2, Library , Mic, LoaderCircle } from 'lucide-react';

const iconMap = {
  albums: Library,
  artists: Mic,
  songs: ListMusicIcon,
  users: Users2
}

interface StatsCardProps {
  type: keyof typeof iconMap,
  total: number,
  color: string,
  iconColor: string
}


export const StatsCard: React.FC<StatsCardProps> = ({ type, total, color, iconColor }) => {

  const Icon = iconMap[type]

  return (
    <div className='grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_3fr] 2xl:grid-cols-[1fr_5fr] w-full h-full bg-zinc-800 hover:bg-zinc-800/80 border-zinc-700/50 p-4 sm:py-7 rounded-lg gap-x-2 sm:gap-x-0 transition-colors'>
      <div className='flex justify-center items-center'>
        <Icon className={`flex ${color} ${iconColor} size-10 sm:size-14 p-2 rounded-md`}/>
      </div>
      <div className='flex flex-col'>
        <h1 className='capitalize sm:text-lg text-zinc-300'>Total {type}</h1>
        <h1 className='capitalize sm:text-3xl font-bold'>{total > 0 ? total : <LoaderCircle className='animate-spin size-5 md:size-7.5'/>}</h1>
      </div>
    </div>
  )
}
