import React from 'react'
import {
  CurrencyDollarIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  UsersIcon,
  ArrowSmUpIcon,
} from '@heroicons/react/solid'

function StatsCardTwo() {
  return (
    <>
    {/* Sales Summary */}
    <div className='col-span-2 grid grid-cols-2 gap-4'>
      <div className='flex flex-row items-center justify-between space-x-4 px-6 py-6 bg-gradient-to-br from-blue-400 to-blue-700 rounded-3xl shadow-xl shadow-gray-100'>
        <div className='flex-col'>
          <p className='text-sm font-light text-white'>Total Sales</p>
          <h1 className='text-3xl font-medium text-white'>1.000.000.000</h1>
          <div className='flex flex-row items-center'>
            <ArrowSmUpIcon width={12} height={12} className='text-white' />
            <p className='text-sm font-light text-white'>20% Since last month</p>
          </div>
        </div>
        <div className='px-3 py-3 bg-gradient-to-tl from-blue-400 to-blue-700 rounded-full'>
          <IdentificationIcon height={28} width={28} className='text-white' />
        </div>
      </div>
      <div className='flex flex-row items-center justify-between space-x-4 px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
        <div className='flex-col'>
          <p className='text-sm font-normal text-blue-950'>Total Customers</p>
          <h1 className='text-2xl font-medium text-blue-950'>1000</h1>
          <div className='flex flex-row items-center'>
            <ArrowSmUpIcon width={12} height={12} className='text-green-500' />
            <p className='text-sm font-light text-green-500'>20% Since last month</p>
          </div>
        </div>
        <div className='px-3 py-3 bg-blue-50 rounded-full'>
          <UsersIcon height={28} width={28} className='text-blue-500' />
        </div>
      </div>
      <div className='flex flex-row items-center justify-between space-x-4 px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
        <div className='flex-col'>
          <p className='text-sm font-normal text-blue-950'>Average Order Value</p>
          <h1 className='text-2xl font-medium text-blue-950'>10.000.000</h1>
          <div className='flex flex-row items-center'>
            <ArrowSmUpIcon width={12} height={12} className='text-green-500' />
            <p className='text-sm font-light text-green-500'>20% Since last month</p>
          </div>
        </div>
        <div className='px-3 py-3 bg-blue-50 rounded-full'>
          <CurrencyDollarIcon height={28} width={28} className='text-blue-500' />
        </div>
      </div>
      <div className='flex flex-row items-center justify-between space-x-4 px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
        <div className='flex-col'>
          <p className='text-sm font-normal text-blue-950'>Total Revenue</p>
          <h1 className='text-2xl font-medium text-blue-950'>1.000.000.000</h1>
          <div className='flex flex-row items-center'>
            <ArrowSmUpIcon width={12} height={12} className='text-green-500' />
            <p className='text-sm font-light text-green-500'>20% Since last month</p>
          </div>
        </div>
        <div className='px-3 py-3 bg-blue-50 rounded-full'>
          <ShieldCheckIcon height={28} width={28} className='text-blue-500' />
        </div>
      </div>
    </div>
    </>
  )
}

export default StatsCardTwo