import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '@/components/input_fields';
import ListDropdown from '@/components/list_dropdown';
import SwitchButton from '@/components/switch_button';
import NumberField from '@/components/number_fields';

import {
  StarIcon
} from '@heroicons/react/solid'

interface DropDownList {
  id: string | '';
  name: string | '';
}

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  token: any;
  item: any;
}

const SizeOption = [
  { id: '1', name: 'Small' },
  { id: '2', name: 'Medium' },
  { id: '3', name: 'Large' },
  { id: '4', name: 'Extra Large' },
]

function FormRoom({ onClose, onUpdated, token, item }: Props) {
  const [roomName, setRoomName] = useState<string | ''>('')
  const [roomSize, setRoomSize] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [roomVIP, setRoomVIP] = useState<boolean>(false)
  const [roomCapacity, setRoomCapacity] = useState<number | 0>(0)
  const [roomStatus, setRoomStatus] = useState<boolean>(false)

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (item) {
      setRoomName(item.roomName)
      setRoomSize(item.roomSize)
      setRoomVIP(item.roomVIP)
      setRoomCapacity(item.roomCapacity)
      setRoomStatus(item.status)
    }
  } ,[item])

  useEffect(() => {
    if (item) {
      const hasDataChanged = 
        item.roomName !== roomName ||
        item.roomSize !== roomSize ||
        item.roomVIP !== roomVIP ||
        item.roomCapacity !== roomCapacity ||
        item.status !== roomStatus;


      setDataChanged(hasDataChanged)
    }
  }, [roomName, roomSize, roomVIP, roomCapacity, roomStatus])

  const isAnyFieldEmpty = !roomName || !roomSize || !roomCapacity

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = newData ? `https://dashboard-sakapulse.vercel.app/api/room/register` : `https://dashboard-sakapulse.vercel.app/api/room/update`;

    const body: any = {
      roomName,
      roomSize,
      roomVIP,
      roomCapacity
    }

    if (!newData) {
      body['_id'] = item._id;
      body['status'] = roomStatus
    }

    try {
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
              onClose();
              onUpdated();
            }, 1500);
            return response.message;
          },
          error: (e: any) => {
            return e.response?.data?.error
          },
        }
      );
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  };

  return (
    <React.Fragment>
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Room Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your room.</p>
            
            <div className="w-full col-span-full flex flex-row items-center space-x-2 mt-6">
              <div onClick={() => setRoomVIP(!roomVIP)} className={`flex flex-row items-center w-fit px-2 py-1 cursor-pointer ${roomVIP ? 'bg-yellow-400' : 'bg-gray-200'} rounded-full`}>
                <StarIcon className="w-4 h-4 text-white" />
                <p className="text-white font-bold text-xs ml-1 pr-1">VIP</p>
              </div>

              {roomVIP && (<p className="text-xs text-gray-400 italic">This room is set as VIP.</p>)}
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Select size room" holder="Choose size of room first..." value={roomSize || { id: '', name: '' }} onChange={setRoomSize} options={SizeOption} />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <InputField label="Room name" value={roomName} onChange={setRoomName} />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2">
                  <NumberField label="Room capacity" value={roomCapacity} onChange={setRoomCapacity} />
                </div>
              </div>
            </div>
          </div>

          {
            !newData && (
              <div className="border-b border-gray-900/10 pb-12 space-y-12">  
                <div className="sm:col-span-full">
                  <SwitchButton label="Setting activation room" enabled={roomStatus} onChange={setRoomStatus} />
                </div>
              </div>
            )
          }
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button 
            onClick={onClose}
            type="button" 
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          {
            newData ? (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={isAnyFieldEmpty}
              >
                Save data
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!dataChanged}
              >
                Update data
              </button>
            )
          }
        </div>
      </form>
    </React.Fragment>
  )
}

export default FormRoom