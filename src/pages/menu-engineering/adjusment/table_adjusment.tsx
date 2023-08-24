import React from 'react'

import {
  XIcon,
} from '@heroicons/react/solid'
import { 
  RefreshIcon,
  FilterIcon,
} from '@heroicons/react/outline'

import { adjustmentData, Adjustment } from '@/utils/typeData'
import { formatCurrency } from '@/utils/formatCurrency'

type Props = {}

function TableAdjusment({}: Props) {
  const groupedData: { [key: string]: Adjustment[] } = {};

  // Group data by date
  adjustmentData.forEach((item) => {
    if (!groupedData[item.date]) {
      groupedData[item.date] = [];
    }
    groupedData[item.date].push(item);
  });

  const ingredientTotals: { [key: string]: number } = {};
  const uniqueIngredients: any[] = [];

  adjustmentData.forEach((item) => {
    if (!ingredientTotals[item.ingredient]) {
      ingredientTotals[item.ingredient] = 0;
      uniqueIngredients.push(item.ingredient); // Add ingredient to the Set
    }
    ingredientTotals[item.ingredient] += item.adjusmentQuantity;
  });

  const totalValue = adjustmentData.reduce((total, item) => total + item.value, 0);

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

          <div className="w-full h-fit flex flex-row items-center justify-center space-x-6 px-6 py-8">
            <div className="w-full flex flex-col items-center text-center bg-gray-100 rounded-xl py-6">
              <h1 className="text-base text-gray-700 font-semibold">{adjustmentData.length}</h1>
              <h1 className="text-base text-gray-700 font-light">ADJUSTMENT</h1>
            </div>
            <div className="w-full flex flex-col items-center text-center bg-gray-100 rounded-xl py-6">
              <h1 className="text-base text-gray-700 font-semibold">{uniqueIngredients.length}</h1>
              <h1 className="text-base text-gray-700 font-light">INGREDIENT ADJUSTMENT</h1>
            </div>
            <div className="w-full flex flex-col items-center text-center bg-gray-100 rounded-xl py-6">
              <h1 className="text-base text-gray-700 font-semibold">({formatCurrency(totalValue)})</h1>
              <h1 className="text-base text-gray-700 font-light">TOTAL ADJUSTMENT EXPENSE</h1>
            </div>
          </div>

          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="flex py-3 px-6 text-left"></th>
                <th className="py-3 px-6 text-center">Note</th>
                <th className="py-3 px-6 text-center">Ingredient</th>
                <th className="py-3 px-6 text-right">Adjustment</th>
                <th className="py-3 px-6 text-left">Expense</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {
                Object.keys(groupedData).map((date) => (
                  <React.Fragment key={date}>
                    <tr>
                      <td colSpan={6} className="py-2 px-6 text-left text-base bg-gray-100">{date}</td>
                    </tr>
                    {
                      groupedData[date].map((item) => (
                        <tr key={item.id}>
                          <td className="py-4 px-6 text-left text-sm">{item.time}</td>
                          <td className="flex py-4 px-6 text-center text-sm"></td>
                          <td className="py-4 px-6 text-center text-sm">{item.note}</td>
                          <td className="py-4 px-6 text-center text-sm">{item.ingredient}</td>
                          <td className="py-4 px-6 text-right text-sm">{`-${item.adjusmentQuantity} ${item.adjusmentUnit}`}</td>
                          <td className="py-4 px-6 text-left text-sm">({formatCurrency(item.value)})</td>
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

export default TableAdjusment