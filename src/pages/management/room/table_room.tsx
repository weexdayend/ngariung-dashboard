import React, { useEffect, useState, Fragment } from 'react'

import PanelComponent from '../../../components/panel_component'
import TableComponent from '@/components/table_component'
import FormRoom from './form_room'

import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline';

import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

import {
  StarIcon
} from '@heroicons/react/solid'

type Props = {
  token: any
  roomData: any
  popoverData: any
  onUpdated: () => void;
}

function TableRoom({ token, roomData, popoverData, onUpdated }: Props) {
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    if(updated){
      onUpdated()
      setUpdated(false)
    }
  }, [updated])

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
    'Assign to',
    'Room Name',
    'Room Size',
    'Room Capacity',
  ]

  const assigned = async (roomId: any, assignedId: any) => {
    const endpoint = 'https://dashboard-sakapulse.vercel.app/api/room/assigned';
    const body: any = {
      roomId: roomId,
      assignedOutletId: assignedId,
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
    return(
      <>
        <td className='py-4 px-6 text-sm flex'>
          {item.status == false && (
            <span className="inline-flex items-center rounded-md bg-rose-50 px-2 py-1 text-sm text-rose-700 ring-1 ring-inset ring-rose-600/20">
              in-Active
            </span>
          )}
          {item.status == true && (
            <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-sm text-green-700 ring-1 ring-inset ring-green-600/20">
              Active
            </span>
          )}
        </td>
        <td className='py-4 px-6 text-sm'>
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                    ${open ? '' : 'text-opacity-90'}
                    group inline-flex items-center rounded-md ${item.outletName ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-600'} px-2 py-1 text-sm font-medium`}
                >
                  <span>{item.outletName ? item.outletName : 'Not assigned'}</span>
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
                        {popoverData.map((pop: any) => (
                          <div
                            onClick={() => {
                              if(item.outletName != pop.name){
                                assigned(item._id, pop.id)
                              }
                            }}
                            key={pop.name}
                            className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out ${item.outletName == pop.name ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-gray-50 text-gray-600'} cursor-pointer`}
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
        </td>
        <td className='py-4 px-6 text-sm font-bold'>
          <span className='w-fit flex flex-row items-center'>
          {item.roomName}
          {item.roomVIP && (
            <div className="flex flex-row items-center w-fit px-2 py-1 bg-yellow-400 rounded-full ml-2">
              <StarIcon className="w-4 h-4 text-white" />
              <p className="text-white font-bold text-xs ml-1 pr-1">VIP</p>
            </div>
          )}
          </span>
        </td>
        <td className='py-4 px-6 text-sm'>{item.roomSize.name}</td>
        <td className='py-4 px-6 text-sm'>
          <span className="text-sm text-indigo-700">
            {item.roomCapacity}
          </span>
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
      <>
        <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600"
            onClick={() => handleClick()}
          >
            Add new employee
          </button>
        </div>
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
      roomData && (<TableComponent columns={column} data={roomData.data} renderRow={renderRow} renderFilter={renderFilter()} />)
    }
    {open && (
      <PanelComponent setOpen={setOpen}>
        <FormRoom 
          onClose={() => setOpen(false)} 
          onUpdated={() => setUpdated(true)} 
          item={editData} 
          token={token}
        />
      </PanelComponent>
    )}
    </>
  )
}

export default TableRoom