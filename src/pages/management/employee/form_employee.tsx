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
  item: any;
}

const role = [
  {
    id: '558',
    name: 'Cashier',
  },
  {
    id: '551',
    name: 'Kitchen',
  },
  {
    id: '331',
    name: 'Instructor',
  },
]

function FormEmployee({ onClose, onUpdated, item }: Props) {
  const [employeeName, setEmployeeName] = useState('');
  const [employeePhone, setEmployeePhone] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeRole, setEmployeeRole] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [employeeStatus, setemployeeStatus] = useState<number>();

  const [enabled, setEnabled] = useState<boolean>(false)

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (item) {
      setEmployeeName(item.employeeName || '');
      setEmployeePhone(item.employeePhone || '');
      setEmployeeEmail(item.employeeEmail || '');
      setEmployeeRole(item.employeeRole || '');
      setemployeeStatus(item.status || 0);

      if(item.status == 1){
        setEnabled(true)
      }else{
        setEnabled(false)
      }
    }
  }, []);

  useEffect(() => {
    if(item){
      const hasDataChanged =
        item.employeeName !== employeeName ||
        item.employeePhone !== employeePhone ||
        item.employeeEmail !== employeeEmail ||
        item.employeeRole !== employeeRole ||
        item.status !== employeeStatus;

      setDataChanged(hasDataChanged);
    }
  }, [employeeName, employeePhone, employeeEmail, employeeRole, employeeStatus])

  useEffect(() => {
    if (enabled) {
      setemployeeStatus(1);
    } else {
      setemployeeStatus(0);
    }
  }, [enabled]);

  const isAnyFieldEmpty = !employeeName || !employeePhone || !employeeEmail || !employeeRole;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const endpoint = newData ? `${process.env.API_URL}employee/register` : `${process.env.API_URL}employee/update`;
    
    const body: any = {
      employeeName,
      employeePhone,
      employeeEmail,
      employeeRole,
    };
  
    if (!newData) {
      body['_id'] = item._id;
      body['status'] = employeeStatus
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Employee Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your employee.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Employee name" value={employeeName} onChange={setEmployeeName} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Employee role" holder="Choose your employee role..." value={employeeRole} onChange={setEmployeeRole} options={role} />
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2">
                  <InputField label="Employee phone" value={employeePhone} onChange={setEmployeePhone} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Employee email" value={employeeEmail} onChange={setEmployeeEmail} />
                </div>
              </div>
            </div>
          </div>

          {
            !newData && (
              <div className="border-b border-gray-900/10 pb-12 space-y-12">  
                <div className="sm:col-span-full">
                  <SwitchButton label="Setting activation employee" enabled={enabled} onChange={setEnabled} />
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

export default FormEmployee