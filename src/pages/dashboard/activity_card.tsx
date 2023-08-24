import React from 'react'
import { ArrowSmUpIcon } from '@heroicons/react/solid'

function ActivityCard() {
  return (
      <div className="px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100 w-full">
        <div className="flex flex-row justify-between">
          <div className="w-full col-span-2">
            <p className="text-xs text-gray-500/50">Daily Leads</p>
          </div>
          <div className="flex flex-row items-center">
            <ArrowSmUpIcon height={14} width={14} className="text-green-500" />
            <p className="text-xs text-green-500 font-medium">2.45%</p>
          </div>
        </div>
        <div className="flex">
          <h1 className="text-4xl text-blue-950">2.508 <span className="text-xs text-gray-500/50">Customers</span></h1>
        </div>
      </div>
  )
}

export default ActivityCard