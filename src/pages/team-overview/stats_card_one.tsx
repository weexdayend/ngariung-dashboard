import React from 'react'

import { 
  UserIcon, 
  ChartBarIcon,
  CashIcon,
} from '@heroicons/react/solid'

function StatsCardOne() {
  return (
    <>
      {/* Breakdown the conversion */}
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-row items-center justify-center space-x-4 px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
          <UserIcon height={28} width={28} className='text-blue-500' />
          <div className='flex-col'>
            <p className='text-sm font-normal text-blue-950/50'>Leads</p>
            <h1 className='text-2xl font-medium text-blue-950'>10000</h1>
          </div>
        </div>

        <div className='flex flex-row items-center justify-center space-x-4 px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
          <ChartBarIcon height={28} width={28} className='text-orange-500' />
          <div className='flex-col'>
            <p className='text-sm font-normal text-blue-950/50'>Opportunities</p>
            <h1 className='text-2xl font-medium text-blue-950'>1000</h1>
          </div>
        </div>

        <div className='col-span-2 flex flex-row items-center justify-center space-x-4 px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
          <CashIcon height={28} width={28} className='text-rose-500' />
          <div className='flex-col'>
            <p className='text-sm font-normal text-blue-950/50'>Conversion</p>
            <h1 className='text-2xl font-medium text-blue-950'>9000</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatsCardOne