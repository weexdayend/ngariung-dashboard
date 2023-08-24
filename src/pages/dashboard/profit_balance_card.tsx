import React from 'react'
import { DotsHorizontalIcon, CurrencyDollarIcon, OfficeBuildingIcon, UserGroupIcon, ArrowSmUpIcon } from '@heroicons/react/solid'

function ProfitBalanceCard() {
  return (
    <div className="px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100 w-full">
    {/* Header Profit Balance */}
    <div className="flex flex-row items-center justify-between bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl px-6 py-6">
      <div className="w-full col-span-2 text-white">
        <p className="flex font-medium text-sm">Profit Balance</p>
        <h1 className="flex font-bold text-4xl">IDR 1.000.000.000</h1>
      </div>
      <div className="flex">
        <DotsHorizontalIcon height={26} width={26} className="text-white" />
      </div>
    </div>

    {/* Content Profit Balance */}
    <div className="mt-6">
      <div className="w-full col-span-2">
        <p className="flex font-normal text-xs text-gray-400">Recent</p>
        <h2 className="flex font-bold text-md text-blue-950/60">11 September 2023</h2>
      </div>

      <div className="w-full col-span-3 mt-4 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center space-x-4">
            <div className="px-2 py-2 bg-blue-50 rounded-full">
              <CurrencyDollarIcon height={24} width={24} className="text-blue-600" />
            </div>
            <p className="text-base font-medium text-blue-950">Total Sales</p>
          </div>
          <p className="text-base font-medium text-blue-950">IDR 100.000.000</p>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center space-x-4">
            <div className="px-2 py-2 bg-blue-50 rounded-full">
              <OfficeBuildingIcon height={24} width={24} className="text-green-600" />
            </div>
            <p className="text-base font-medium text-blue-950">Revenue Trends</p>
          </div>
          <div className="flex flex-row items-center">
            <ArrowSmUpIcon height={18} width={18} className="text-green-600" />
            <p className="text-base font-medium text-green-600">10.000.000</p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <div className="inline-flex items-center space-x-4">
            <div className="px-2 py-2 bg-blue-50 rounded-full">
              <UserGroupIcon height={24} width={24} className="text-orange-600" />
            </div>
            <p className="text-base font-medium text-blue-950">Customer Acquisition</p>
          </div>
          <p className="text-base font-medium text-blue-950">1.000.000</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProfitBalanceCard