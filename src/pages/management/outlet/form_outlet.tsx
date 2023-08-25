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

const line = [
  {
    id: "1",
    name: 'Restaurant',
  },
  {
    id: "2",
    name: 'Coffee Shop',
  },
  {
    id: "3",
    name: 'Fitness',
  },
  {
    id: "4",
    name: 'Studio Photo',
  },
  {
    id: "5",
    name: 'Bar',  
  },
]

function FormOutlet({ onClose, onUpdated, item }: Props) {
  const [outletName, setOutletName] = useState('');
  const [outletAddress, setOutletAddress] = useState('');
  const [outletProvince, setOutletProvince] = useState('');
  const [outletCity, setOutletCity] = useState('');
  const [outletZip, setOutletZip] = useState('');
  const [outletLine, setOutletLine] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [outletStatus, setOutletStatus] = useState<number>();

  const [enabled, setEnabled] = useState<boolean>(false)

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (item) {
      setOutletName(item.outletName || '');
      setOutletAddress(item.outletAddress || '');
      setOutletProvince(item.outletProvince || '');
      setOutletCity(item.outletCity || '');
      setOutletZip(item.outletZip || '');
      setOutletLine(item.outletLine || '');
      setOutletStatus(item.status || 0)

      if(item.status == 1){
        setEnabled(true)
      }else{
        setEnabled(false)
      }
    }
  }, [item]);

  useEffect(() => {
    if(item){
      const hasDataChanged =
        item.outletName !== outletName ||
        item.outletAddress !== outletAddress ||
        item.outletProvince !== outletProvince ||
        item.outletCity !== outletCity ||
        item.outletZip !== outletZip ||
        item.outletLine !== outletLine ||
        item.status !== outletStatus;

      setDataChanged(hasDataChanged);
    }
  }, [outletName, outletAddress, outletProvince, outletCity, outletZip, outletLine, outletStatus])

  useEffect(() => {
    if (enabled) {
      setOutletStatus(1);
    } else {
      setOutletStatus(0);
    }
  }, [enabled]);

  const isAnyFieldEmpty = !outletName || !outletLine || !outletAddress || !outletProvince || !outletCity || !outletZip;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const endpoint = newData ? '/api/outlet/register' : '/api/outlet/update';
    
    const body: any = {
      outletName,
      outletLine,
      outletAddress,
      outletProvince,
      outletCity,
      outletZip
    };
  
    if (!newData) {
      body['_id'] = item._id;
      body['status'] = outletStatus
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Outlet Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your outlet.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Outlet name" value={outletName} onChange={setOutletName} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Outlet line" holder="What is your outlet line..." value={outletLine} onChange={setOutletLine} options={line} />
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2">
                  <InputField label="Outlet address" value={outletAddress} onChange={setOutletAddress} />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <div className="mt-2">
                  <InputField label="Outlet city" value={outletCity} onChange={setOutletCity} />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-2">
                  <InputField label="Outlet province" value={outletProvince} onChange={setOutletProvince} />
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="mt-2">
                  <InputField label="Outlet postal code" value={outletZip} onChange={setOutletZip} />
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

export default FormOutlet