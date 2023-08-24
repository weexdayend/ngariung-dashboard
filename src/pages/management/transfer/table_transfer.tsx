import React from 'react'

import {
  XIcon,
} from '@heroicons/react/solid'
import { 
  RefreshIcon,
  FilterIcon,
} from '@heroicons/react/outline'

import { adjustmentData, Adjustment, transferIngredient, Transfer } from '@/utils/typeData'
import { formatCurrency } from '@/utils/formatCurrency'

type Props = {}

function TableTransfer({}: Props) {
  const groupedData: { [key: string]: Transfer[] } = {};

  // Group data by date
  transferIngredient.forEach((item) => {
    if (!groupedData[item.date]) {
      groupedData[item.date] = [];
    }
    groupedData[item.date].push(item);
  });

  return (
    <>
      {/* Table presence and recent activity */}
      <div className='flex'>
        <div className='row-span-1 w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
          <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200"
            >
              Export to CSV
            </button>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="flex py-3 px-6 text-left"></th>
                <th className="py-3 px-6 text-left">Transfer From</th>
                <th className="py-3 px-6 text-left">Transfer To</th>
                <th className="py-3 px-6 text-left">Order Number</th>
                <th className="py-3 px-6 text-left">Ingredients</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {
                Object.keys(groupedData).map((date) => (
                  <React.Fragment key={date}>
                    <tr>
                      <td colSpan={7} className="py-2 px-6 text-left text-base bg-gray-100">{date}</td>
                    </tr>
                    {
                      groupedData[date].map((item) => (
                        <tr key={item.orderNumber}>
                          <td className="py-4 px-6 text-left text-sm">{item.time}</td>
                          <td className="flex py-4 px-6 text-center text-sm"></td>
                          <td className="py-4 px-6 text-left text-sm">{item.fromOutlet}</td>
                          <td className="py-4 px-6 text-left text-sm">{item.toOutlet}</td>
                          <td className="py-4 px-6 text-left text-sm">{item.orderNumber}</td>
                          <td className="py-4 px-6 text-left text-sm">{item.ingredients.length} Ingredients</td>
                          <td className="py-4 px-6 text-left text-sm">
                            {
                              item.status == 'In Progress' && (
                                <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                                  {item.status}
                                </span>
                              )
                            }
                            {
                              item.status == 'Completed' && (
                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm text-green-700 ring-1 ring-inset ring-green-600/20">
                                  {item.status}
                                </span>
                              )
                            }
                            {
                              item.status == 'Cancel' && (
                                <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
                                  {item.status}
                                </span>
                              )
                            }
                          </td>
                        </tr>
                      ))
                    }
                  </React.Fragment>
                ))
              }
              {/* {
                adjusmentData.map((productItem, i) => (
                  <>
                  <tr className='hover:bg-gray-50' key={i}>
                    <td colSpan={6} className="py-4 px-6 text-center text-sm">{productItem.date}</td>
                    <td className="py-4 px-6 text-center text-sm"></td>
                    <td className="py-4 px-6 text-center text-sm">{productItem.note}</td>
                    <td className="py-4 px-6 text-center text-sm">{productItem.ingredient}</td>
                    <td className="py-4 px-6 text-center text-sm">{`-${productItem.adjusmentQuantity} ${productItem.adjusmentUnit}`}</td>
                    <td className="py-4 px-6 text-left text-sm">({formatCurrency(productItem.expense)})</td>
                  </tr>
                  </>
                ))
              } */}
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default TableTransfer