import React, { useState } from 'react'
import { Transition } from '@headlessui/react';

import TableComponent from '@/components/table_component'
import PanelComponent from '../../../components/panel_component'

import {
  BriefcaseIcon,
  XIcon,
} from '@heroicons/react/solid'
import { 
  RefreshIcon,
  FilterIcon,
} from '@heroicons/react/outline'

import { formatCurrency } from '@/utils/formatCurrency'
import { dealData } from '@/utils/typeData';

import FormDeal from './form_deal';

type Props = {}

function TableOrder({}: Props) {

  const column = [
    '', 
    'Deal', 
    'Deal Value', 
    'Contact', 
    'Priority', 
    'Deal Length', 
    // 'Expected Closed Deal', 
    // 'Close Probability',
    // 'Forecast Value',
    // 'Close Date',
    // 'Actual Deal Value',
    // 'Deal Creation Date',
    'Status'
  ]

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

  const renderRow = (item: any) => {
    return(
      <>
        <td className="py-4 px-6 text-sm text-right">
          {
            item.stage == 'New' && (
              <span className="inline-flex items-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm text-white">
                {item.stage}
              </span>
            )
          }
          {
            item.stage == 'Discovery' && (
              <span className="inline-flex items-center rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white">
                {item.stage}
              </span>
            )
          }
          {
            item.stage == 'Proposal' && (
              <span className="inline-flex items-center rounded-md bg-green-700 px-3 py-1.5 text-sm text-white">
                {item.stage}
              </span>
            )
          }
          {
            item.stage == 'Negotiation' && (
              <span className="inline-flex items-center rounded-md bg-purple-500 px-3 py-1.5 text-sm text-white">
                {item.stage}
              </span>
            )
          }
          {
            item.stage == 'Won' && (
              <span className="inline-flex items-center rounded-md bg-green-500 px-3 py-1.5 text-sm text-white">
                {item.stage}
              </span>
            )
          }
          {
            item.stage == 'Lost' && (
              <span className="inline-flex items-center rounded-md bg-red-500 px-3 py-1.5 text-sm text-white">
                {item.stage}
              </span>
            )
          }
        </td>
        <td className="py-4 px-6 text-sm">{item.deal}</td>
        <td className="py-4 px-6 text-sm">{formatCurrency(item.dealValue)}</td>
        <td className="py-4 px-6 text-sm">
          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm text-blue-700 ring-1 ring-inset ring-blue-600/20">
            {item.contact}
          </span>  
        </td>
        <td className="py-4 px-6 text-sm">
        {
          item.priority == 'Critical' && (
            <span className="inline-flex items-center rounded-md bg-red-400 px-2 py-1 text-sm text-white ring-1 ring-inset ring-red-600/20">
              {item.priority}
            </span>
          )
        }
        {
          item.priority == 'High' && (
            <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-sm text-red-700 ring-1 ring-inset ring-red-600/20">
              {item.priority}
            </span>
          )
        }
        {
          item.priority == 'Medium' && (
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
              {item.priority}
            </span>
          )
        }
        {
          item.priority == 'Low' && (
            <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700 ring-1 ring-inset ring-gray-600/20">
              {item.priority}
            </span>
          )
        }
        </td>
        <td className="py-4 px-6 text-sm">{item.dealLength}</td>
        <td className="py-4 px-6 text-sm">
          {
            item.status == 'Working on it' && (
              <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm text-yellow-700 ring-1 ring-inset ring-yellow-600/20">
                {item.status}
              </span>
            )
          }
          {
            item.status == 'Stuck' && (
              <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
                {item.status}
              </span>
            )
          }
        </td>
        <td className="py-4 px-6 text-sm space-x-2">
          <button className="border border-indigo-400 px-1 py-1 text-sm rounded-md text-indigo-400" onClick={() => handleClick(true,'Edit Data')}>
            <BriefcaseIcon width={18} height={18} />
          </button>
        </td>
      </>
    )
  }

  const renderFilter = () => {
    return (
      <>
        <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600"
            onClick={() => handleClick(true,'Add New Deal')}
          >
            Add new deal
          </button>
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
      </>
    )
  }

  return (
    <>
      <TableComponent columns={column} data={dealData} renderRow={renderRow} renderFilter={renderFilter()} />
      {open && (
        <PanelComponent setOpen={setOpen}>
          <FormDeal title={type} />
        </PanelComponent>
      )}
    </>
  )
}

export default TableOrder