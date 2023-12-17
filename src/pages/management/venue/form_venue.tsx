import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '@/components/input_fields';
import ListDropdown from '@/components/list_dropdown';
import SwitchButton from '@/components/switch_button';
import NumberField from '@/components/number_fields';

interface DropDownList {
  id: string | '';
  name: string | '';
}

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  item: any;
}

const SizeOption = [
  { id: '1', name: 'Small' },
  { id: '2', name: 'Medium' },
  { id: '3', name: 'Large' },
  { id: '4', name: 'Extra Large' },
]

function FormVenue({ onClose, onUpdated, item }: Props) {
  const [VenueName, setVenueName] = useState<string>('')
  const [VenueSize, setVenueSize] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [VenueCapacity, setVenueCapacity] = useState<number>(0)
  const [VenueStatus, setVenueStatus] = useState<boolean>(false)

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
  if (item) {
    setVenueName(item.VenueName || '');
    setVenueSize(item.VenueSize || { id: '', name: '' });
    setVenueCapacity(item.VenueCapacity || 0);
    setVenueStatus(item.VenueStatus || false);
  }
}, [item]);

  useEffect(() => {
    if (item) {
      const hasDataChanged = 
        item.VenueName !== VenueName ||
        item.VenueSize !== VenueSize ||
        item.VenueCapacity !== VenueCapacity ||
        item.VenueStatus !== VenueStatus;

      setDataChanged(hasDataChanged)
    }
  }, [item, VenueName, VenueSize, VenueCapacity, VenueStatus])

  const isAnyFieldEmpty = !VenueName || !VenueSize || !VenueCapacity

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = newData ? `${process.env.API_URL}venue/register` : `${process.env.API_URL}venue/update`;

    const body: any = {
      VenueName,
      VenueSize,
      VenueCapacity
    }

    if (!newData) {
      body['VenueID'] = item.VenueID;
      body['VenueStatus'] = VenueStatus
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Venue Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your venue.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Select size room" holder="Choose size of room first..." value={VenueSize || { id: '', name: '' }} onChange={setVenueSize} options={SizeOption} />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <InputField label="Room name" value={VenueName} onChange={setVenueName} />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2">
                  <NumberField label="Room capacity" value={VenueCapacity} onChange={setVenueCapacity} />
                </div>
              </div>
            </div>
          </div>

          {
            !newData && (
              <div className="border-b border-gray-900/10 pb-12 space-y-12">  
                <div className="sm:col-span-full">
                  <SwitchButton label="Setting activation room" enabled={VenueStatus} onChange={setVenueStatus} />
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

export default FormVenue