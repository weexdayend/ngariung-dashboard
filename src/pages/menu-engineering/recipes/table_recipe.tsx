import React, { useState } from 'react'
import { Transition } from '@headlessui/react';

import {
  XIcon,
} from '@heroicons/react/solid'
import { 
  RefreshIcon,
  FilterIcon,
} from '@heroicons/react/outline'


import { ingredientLibrary, itemLibrary, itemRecipe, productData } from '@/utils/typeData';
import PanelComponent from '../../../components/panel_component';
import { formatCurrency } from '@/utils/formatCurrency';

type Props = {}

function TableRecipe({}: Props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleComponent = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (clickSet:boolean, clickType:string) => {
    setOpen(clickSet);
    setType(clickType);
  };

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
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={toggleComponent}
            >
              <FilterIcon className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
              Filter
            </button>
          </div>
          <div className='w-full mb-4 px-4 py-4'>
            <Transition
              show={isOpen}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* Your component content goes here */}
              <div className="rounded-xl mb-6">
                {/* Additional component content */}
                <div className='flex flex-row justify-end mb-2'>
                  <XIcon width={18} height={18} className='text-gray-400' onClick={toggleComponent} />
                </div>
                <div className="w-full">
                  <div className='flex flex-row justify-between space-x-4 mb-6'>
                  <div className="w-full">
                    <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                      Brand
                    </label>
                    <div className="mt-1">
                      <select
                        id="brand"
                        name="brand"
                        autoComplete="brand-name"
                        className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="product" className="block text-sm font-medium leading-6 text-gray-900">
                      Product
                    </label>
                    <div className="mt-1">
                      <select
                        id="product"
                        name="product"
                        autoComplete="product-name"
                        className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                      Category
                    </label>
                    <div className="mt-1">
                      <select
                        id="category"
                        name="category"
                        autoComplete="category-name"
                        className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                      Price
                    </label>
                    <div className="mt-1">
                      <select
                        id="price"
                        name="price"
                        autoComplete="price"
                        className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </Transition>
            
            <div className='flex flex-row justify-end items-center space-x-2'>
              {
                isOpen && (
                  <>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-gray-400 px-3 py-2 text-sm text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      <RefreshIcon className="-ml-0.5 mr-1 h-5 w-5" aria-hidden="true" />
                      Clear
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md border border-indigo-500 px-3 py-2 text-sm text-indigo-500 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    >
                      Apply Filter
                    </button>
                  </>
                )
              }
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">Item Name</th>
                <th className="py-3 px-6 text-left">Variant</th>
                <th className="py-3 px-6 text-right">Ingredient</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {
                itemRecipe.map((item, i) => (
                  <>
                  <tr className='hover:bg-gray-50' key={i}>
                    <td className="py-4 px-6 text-left text-sm">{item.item}</td>
                    <td className="py-4 px-6 text-left text-sm">
                      {!item.variant ? 'No Variant' : item.variant}
                    </td>
                    <td className="py-4 px-6 text-right text-sm">
                      {`${item.ingredient.length} Ingredient`}
                    </td>
                  </tr>
                  </>
                ))
              }
              {/* Add more rows here */}
            </tbody>
          </table>
        </div>
      </div>

      {/* {open && (
        <PanelComponent setOpen={setOpen}>
          {
            type == 'View Data' ? <ViewDataInventory /> : <FormInventory title={type} />
          }
        </PanelComponent>
      )} */}
    </>
  )
}

export default TableRecipe