import React, { useEffect, useState, Fragment } from 'react'

import PanelComponent from '../../../components/panel_component'
import TableComponent from '@/components/table_component'
import FormEvents from './form_events';

import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

type Props = {
  dataEvent: any
  dataType: any
  dataCategory: any
  onUpdated: () => void;
}

function TableEvents({ dataEvent, dataType, dataCategory, onUpdated }: Props) {
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

  const column = [
    '',
    'Event Date',
    'Event Name',
    'Event Type',
    'Event Category',
    '',
  ]

  const renderRow = (item: any) => {
    const uniqueKey = `event-row-${item.EventID}-${item.EventName}`;

    return(
      <tr key={uniqueKey} className='hover:bg-gray-50'>
        <td className='py-4 px-6 text-sm flex'>
          {item.EventStatus == false && (
            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
              in-Active
            </span>
          )}
          {item.EventStatus == true && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          )}
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          {item.EventDate}
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          <Link href={`/management/events/${item.EventID}`} className="text-sm text-indigo-700">
            {item.EventName}
          </Link>
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          {item.EventType.name}
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          {item.EventCategory.name}
        </td>
        <td className='py-4 px-6'>
          <div onClick={() => handleEdit(item)} className='py-1 px-2 w-fit rounded-md bg-indigo-400 text-white text-sm font-normal cursor-pointer'>
            Edit
          </div>
        </td>
      </tr>
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
      dataEvent && (<TableComponent columns={column} data={dataEvent.data} renderRow={renderRow} renderFilter={renderFilter()} />)
    }
    {open && (
      <PanelComponent setOpen={setOpen}>
        <FormEvents 
          onClose={() => setOpen(false)} 
          onUpdated={() => setUpdated(true)} 
          item={editData} 
          dataType={dataType}
          dataCategory={dataCategory}
        />
      </PanelComponent>
    )}
    </>
  )
}

export default TableEvents