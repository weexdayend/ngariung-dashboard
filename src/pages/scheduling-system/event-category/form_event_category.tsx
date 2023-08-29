import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '../../../components/input_fields';
import SwitchButton from '@/components/switch_button';
import ListDropdown from '../../../components/list_dropdown';

interface DropDownList {
  id: string | '';
  name: string | '';
}

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  item: any
}

function FormEventCategory({ onClose, onUpdated, item }: Props) {
  const [nameCategory, setNameCategory] = useState('');
  const [eventStatus, setEventStatus] = useState('');

  const [enabled, setEnabled] = useState<boolean>(false)

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  const isAnyFieldEmpty = !nameCategory

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const endpoint = newData ? `${process.env.API_URL}event-category/register` : `${process.env.API_URL}event-category/update`;
    
    const body: any = {
      nameCategory,
    };
  
    if (!newData) {
      body['_id'] = item._id;
      body['status'] = eventStatus
    }

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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Event Type Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your event type.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Event category" value={nameCategory} onChange={setNameCategory} />
                </div>
              </div>
            </div>
          </div>

          {
            !newData && (
              <div className="border-b border-gray-900/10 pb-12">      
                <div className="sm:col-span-full">
                  <SwitchButton label="Setting activation outlet" enabled={enabled} onChange={setEnabled} />
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

export default FormEventCategory