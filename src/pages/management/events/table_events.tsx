import React, { useEffect, useState, Fragment } from 'react'

import PanelComponent from '../../../components/panel_component'
import TableComponent from '@/components/table_component'
import FormEvents from './form_events';

import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type Props = {
  dataEvent: any;
  dataTypes: any;
  dataCategories: any;
  onUpdated: () => void;
}

function TableEvents({ dataEvent, dataTypes, dataCategories, onUpdated }: Props) {
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if (updated) {
      onUpdated();
      setUpdated(false);
    }
  }, [updated, onUpdated]);

  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleClick = () => {
    setOpen(!open);
    setEditData(null)
  };

  const handleEdit = (item: any) => {
    setOpen(!open)
    setEditData(item)
  }

  const column = []

  const renderRow = (item: any) => {
    const uniqueKey = `event-row-${item.EventID}-${item.EventName}`;
    return(
      <>
        <td className='py-4 px-6 text-sm font-bold'>
          {item.EventDate}
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          <Link href={`/management/events/${item.EventID}`} className="text-sm text-indigo-700">
            {item.EventName}
          </Link>
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          {item.EventTime.EventStart}
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          {item.EventTime.End}
        </td>
        <td className='py-4 px-6'>
          <div onClick={() => handleEdit(item)} className='py-1 px-2 w-fit rounded-md bg-indigo-400 text-white text-sm font-normal cursor-pointer'>
            Edit
          </div>
        </td>
      </>
    )
  }

  const renderFilter = () => {
    return (
      <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600"
          onClick={() => handleClick()}
        >
          Add new event
        </button>
      </div>
    )
  }

  return (
    <>
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: 'linear-gradient(90deg, #4f46e5 0%, #fb7185 100%)', // Green gradient
            color: '#fff'
          },
        },
      }}
    />
    {
      dataEvent && (
        <>
        <div className='row-span-1 w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
          <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
            <button
              type="button"
              className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600"
              onClick={() => handleClick()}
            >
              Add new event
            </button>
          </div>
          <table className="w-full flex-1 table-auto">
            <thead>
              <tr>
                <th className='px-3 py-3 text-left'>Date</th>
                <th className='px-3 py-3 text-left'>Name</th>
                <th className='px-3 py-3 text-left'>Start</th>
                <th className='px-3 py-3 text-left'>End</th>
                <th className='px-3 py-3 text-left'></th>
              </tr>
            </thead>
            <tbody className='w-full flex-1'>
              {
                dataEvent.data.map((item: any, index: number) => (
                  <tr className='w-full'>
                    <td className='px-3 py-3 text-left text-sm'>{item.EventDate}</td>
                    <td className='px-3 py-3 text-left text-sm'>
                      <Link href={`/management/events/${item.EventID}`} className="text-sm text-indigo-700">
                        {item.EventName}
                      </Link>  
                    </td>
                    <td className='px-3 py-3 text-left text-sm'>{item.EventTime.EventStart}</td>
                    <td className='px-3 py-3 text-left text-sm'>{item.EventTime.EventEnd}</td>
                    <td className='py-4 px-6'>
                      <div onClick={() => handleEdit(item)} className='py-1 px-2 w-fit rounded-md bg-indigo-400 text-white text-sm font-normal cursor-pointer'>
                        Edit
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        </>
      )
    }
    {open && (
      <PanelComponent setOpen={setOpen}>
        <FormEvents 
          onClose={() => setOpen(false)}
          onUpdated={() => setUpdated(true)}
          item={editData} 
          dataType={dataTypes} 
          dataCategory={dataCategories}        
        />
      </PanelComponent>
    )}
    </>
  )
}

export default TableEvents