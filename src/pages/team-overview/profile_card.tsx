import { StarIcon } from '@heroicons/react/solid'
import React from 'react'

function ProfileCard() {
  return (
    <div className='relative px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <div className="w-full flex flex-col items-center">
        <div className="w-full h-44 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-300">
        </div>
      
        <div className="w-fit px-8 py-7 border-4 border-white bg-blue-950 rounded-full text-white mb-2 -mt-14">
          IG
        </div>
        
        <h1 className="text-3xl font-bold">Kota Bandung</h1>
        <h3 className="text-xs font-normal text-blue-950/30">PT. KURA-KURA MAJU JAYA</h3>
        
        <div className='absolute top-5 right-10'>
          <div className='flex flex-row items-center space-x-1 px-4 py-2 bg-white rounded-full shadow-lg mt-6'>
            <p className='text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500'>Sales of The Month</p>
            <StarIcon height={16} width={16} className='text-purple-500' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard