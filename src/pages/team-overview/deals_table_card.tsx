import React from 'react'

import { 
  DotsHorizontalIcon,
} from '@heroicons/react/solid'

function DealsTableCard() {
  return (
    <>
      {/* Table presence and recent activity */}
      <div className='flex'>
        <div className='row-span-1 w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
          <div className='flex flex-row items-center justify-between space-x-4 '>
            <div className='flex flex-col'>
              <h1 className='text-lg text-blue-950 font-medium'>Deals</h1>
              <p className='text-sm text-blue-950/40 font-normal'>This month deals from every partners.</p>
            </div>
            <div>
              <DotsHorizontalIcon height={28} width={28} />
            </div>
          </div>

          <div className='w-full mt-6'>
            <div className='grid grid-cols-4 gap-4'>
              <h1 className='font-semibold text-base'>Date</h1>
              <h1 className='font-semibold text-base'>Event</h1>
              <h1 className='font-semibold text-base'>Location</h1>
              <h1 className='font-semibold text-base text-center'>Time</h1>
            </div>

            <div className='grid grid-cols-4 gap-4 border-b border-blue-950/10 py-2'>
              <p className='text-base'>1 January 2023</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base text-center'>12.00</p>
            </div>
            <div className='grid grid-cols-4 gap-4 border-b border-blue-950/10 py-2'>
              <p className='text-base'>1 January 2023</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base text-center'>12.00</p>
            </div>
            <div className='grid grid-cols-4 gap-4 border-b border-blue-950/10 py-2'>
              <p className='text-base'>1 January 2023</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base text-center'>12.00</p>
            </div>
            <div className='grid grid-cols-4 gap-4 border-b border-blue-950/10 py-2'>
              <p className='text-base'>1 January 2023</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base text-center'>12.00</p>
            </div>
            <div className='grid grid-cols-4 gap-4 border-b border-blue-950/10 py-2'>
              <p className='text-base'>1 January 2023</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base'>Bandung Indah Plaza</p>
              <p className='text-base text-center'>12.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DealsTableCard