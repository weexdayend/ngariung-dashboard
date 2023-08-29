import React, { useEffect, useState, Fragment } from 'react'

import TableComponent from '@/components/table_component'

import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline';

import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios';

import PanelComponent from '@/components/panel_component';
import FormPrices from './form_prices';

type Props = {
  onUpdated: () => void;
  scheduleData: any
}

function TableRoom({ onUpdated, scheduleData }: Props) {
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if(updated){
      onUpdated()
      setUpdated(false)
    }
  }, [updated, onUpdated])

  const column = [
    '',
    'Event Date',
    'Outlet',
    'Event Category',
    'Event Name',
    'Booking',
    'Ticket Price',
  ]

  const Gates = [
    { id: '1', name: 'Open' },
    { id: '2', name: 'Closed' },
    { id: '3', name: 'Finished' },
  ]

  const [editData, setEditData] = useState(null)
  const [formPrices, setFormPrices] = useState(false)
  const [selectedData, setSelectedData] = useState([])

  const handleAddPrices = (item: any) => {
    setSelectedData(item)
    setFormPrices(true)
  }

  const assigned = async (roomId: any, assignedId: any, gates: any) => {
    const endpoint = `${process.env.API_URL}schedule/assigned`;
    const body: any = {
      _id: roomId,
      scheduleId: assignedId,
      gates: gates
    };
    const responsePromise = new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(endpoint, body)
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });

    await toast.promise(
      responsePromise, // Resolve with the response data
      {
        loading: 'Updating your data...',
        success: (response: any) => {
          setTimeout(() => {
            onUpdated();
          }, 1500);
          return response.message;
        },
        error: (e: any) => {
          return e.response?.data?.error
        },
      }
    );
  }

  const renderRow = (item: any) => {

    let totalAmount = 0
    let taxAmount = 0
    let serviceAmount = 0
    item.schedule.map((schedule: any) => {
      taxAmount = parseInt(schedule.prices.basePrice)*(parseInt(schedule.prices.taxRate)/100);
      serviceAmount = parseInt(schedule.prices.basePrice)*(parseInt(schedule.prices.serviceRate)/100);
      totalAmount = parseInt(schedule.prices.basePrice)+taxAmount+serviceAmount
    })

    return(
      <>
        <td className='py-4 px-3 text-sm'>
          {
            item.schedule.map((schedule: any) => (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                      ${open ? '' : 'text-opacity-90'}
                      group inline-flex items-center rounded-md ${schedule.gates ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-600'} px-2 py-1 text-sm font-medium`}
                  >
                    <span>{schedule.gates ? schedule.gates : 'Not open yet'}</span>
                    <ChevronDownIcon
                      className={`${open ? '' : 'text-opacity-70'}
                        ml-2 h-5 w-5 text-white transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-md">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-2">
                          {Gates.map((pop: any) => (
                            <div
                              onClick={() => {
                                if(schedule.gates != pop.name){
                                  assigned(item._id, schedule.scheduleId, pop.name)
                                }
                              }}
                              key={pop.name}
                              className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out ${schedule.gates == pop.name ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-gray-50 text-gray-600'} cursor-pointer`}
                            >
                              <div className="">
                                <p className="text-sm font-medium">
                                  {pop.name}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
            ))
          }
        </td>
        <td className='py-4 px-3 text-xs'>
          {item.date}
        </td>
        <td className='py-4 px-3 text-xs'>
          {item.outlet.name}
        </td>
        <td className='py-4 px-3 text-xs'>
          <span className='w-fit flex flex-row items-center'>
            {item.schedule.map((schedule: any) => (
              <>{schedule.eventCategory.name}</>
            ))}
          </span>
        </td>
        <td className='py-4 px-3 text-xs font-bold'>
          <span className='w-fit flex flex-row items-center'>
          {item.schedule.map((schedule: any) => (
            <>{schedule.eventName} - {schedule.eventType.name}</>
          ))}
          </span>
        </td>
        <td className='py-4 px-3 text-xs'>
          <span className='w-fit flex flex-row items-center'>
            {item.schedule.map((schedule: any) => (
              <>{schedule.currentBookings}/{schedule.maxBookings}</>
            ))}
          </span>
        </td>
        <td className='py-4 px-3 text-xs'>
          <div className='w-fit flex flex-row items-center cursor-pointer' onClick={() => handleAddPrices(item)}>
            {item.schedule.map((schedule: any) => (
              <>{schedule.prices.basePrice === 0 ? 'Add Prices' : totalAmount}</>
            ))}
          </div>
        </td>
      </>
    )
  }

  const renderFilter = () => {
    return (
      <>
      </>
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
      scheduleData && (<TableComponent columns={column} data={scheduleData.data} renderRow={renderRow} renderFilter={renderFilter()} />)
    }
    {formPrices && (
      <PanelComponent setOpen={setFormPrices}>
        <FormPrices 
          onClose={() => setFormPrices(false)} 
          onUpdated={() => setUpdated(true)} 
          item={selectedData}  
        />
      </PanelComponent>
    )}
    </>
  )
}

export default TableRoom