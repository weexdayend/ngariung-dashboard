import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '@/components/input_fields';
import InputTime from '@/components/input_time';
import ListDropdown from '@/components/list_dropdown';
import NumberField from '@/components/number_fields';

import {
  BriefcaseIcon,
} from '@heroicons/react/solid'

interface Slot {
  instructor: string;
  classType: string,
  className: string;
  startTime: string;
  endTime: string;
  maxBookings: number;
  room: string;
  currentBookings: number;
  bookings: [];
}

interface ClassSchedule {
  day: string;
  outlet: string;
  schedule: Slot[];
}

interface DropDownList {
  id: string | '';
  name: string | '';
}

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  token: any;
  item: any;
  outletData: any;
}

const ListDay = [
  { id: '1', name: 'Sunday' },
  { id: '2', name: 'Monday' },
  { id: '3', name: 'Tuesday' },
  { id: '4', name: 'Wednesday' },
  { id: '5', name: 'Thursday' },
  { id: '6', name: 'Friday' },
  { id: '7', name: 'Saturday' },
]

const TypeClass = [
  { id: '0', name: 'Beginner' },
  { id: '1', name: 'Regular' },
  { id: '2', name: 'Private' },
  { id: '3', name: 'Member' },
]

function FormSchedule({ onClose, onUpdated, token, item, outletData }: Props) {
  const [className, setClassName] = useState<string>('');
  const [day, setDay] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' });
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [maxBookings, setMaxBookings] = useState<number>(0);

  const [selectOutlet, setSelectOutlet] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [selectInstructor, setSelectInstructor] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [selectRoom, setSelectRoom] = useState<DropDownList | { id: '', name: '' }>({ id: '', name: '' })
  const [selectTypeClass, setTypeClass] = useState('')

  const [itemEmployee, setItemEmployee] = useState<any[]>([]);
  const [itemRoom, setItemRoom] = useState<any[]>([]);

  const formattedDataArray = outletData.data.map((dataItem: any) => {
    const { id, name, employees, rooms } = dataItem;
  
    // Check if there is data in employees and rooms arrays
    const hasEmployees = employees && employees.length > 0;
    const hasRooms = rooms && rooms.length > 0;
  
    // Include the outlet only if it has data in employees or rooms
    if (hasEmployees || hasRooms) {
      return {
        id,
        name,
        employees: hasEmployees ? employees : [], // Empty array if no employees data
        rooms: hasRooms ? rooms : [], // Empty array if no rooms data
      };
    } else {
      return null; // Exclude outlets without employees and rooms data
    }
  }).filter(Boolean); // Remove null values from the array

  useEffect(() => {
    if (selectOutlet.id !== '' && selectOutlet.name !== '') {
      const filteredOutlet = formattedDataArray.find((outlet: any) => outlet.name === selectOutlet.name);

      if (filteredOutlet) {
        const instructorEmployees = filteredOutlet.employees.filter(
          (employee: any) => employee.role?.name === 'Instructor'
        );

        setItemEmployee(instructorEmployees);
        setItemRoom(filteredOutlet.rooms);
      }

    }
  }, [selectOutlet]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = '/api/class/register';

    const newSlot: Slot = {
      instructor: selectInstructor.name,
      classType: selectTypeClass,
      className,
      startTime,
      endTime,
      maxBookings,
      room: selectRoom.name, // Add the selected room
      currentBookings: 0,
      bookings: [],
    };
  
    const newSchedule: ClassSchedule = {
      day: day.name,
      outlet: selectOutlet.id,
      schedule: [newSlot],
    };

    try {
      const responsePromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(endpoint, newSchedule)
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Class Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your class.</p>

            <div className="w-full col-span-full flex flex-row items-center space-x-2 mt-6">
              {
                TypeClass.map((item, i) => (
                  <div key={i} onClick={() => setTypeClass(item.name)} className={`flex flex-row items-center w-fit px-3 py-2 cursor-pointer rounded-full ${item.name == selectTypeClass ? 'bg-gradient-to-r from-indigo-400 to-rose-400' : 'bg-gray-400'}`}>
                    <BriefcaseIcon className="w-4 h-4 text-white" />
                    <p className="text-white font-bold text-xs ml-1 pr-1">{item.name}</p>
                  </div>
                ))
              }
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Select outlet" holder="Choose outlet first..." value={selectOutlet || { id: '', name: '' }} onChange={setSelectOutlet} options={formattedDataArray} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Class name" value={className} onChange={setClassName} />
                </div>
              </div>

              <div className="col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Select instructor" holder="Choose instructor class..." value={selectInstructor || { id: '', name: '' }} onChange={setSelectInstructor} options={itemEmployee} />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2">
                <ListDropdown label="Select room" holder="Choose room class..." value={selectRoom || { id: '', name: '' }} onChange={setSelectRoom} options={itemRoom} />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2">
                  <NumberField label="Max quota" value={maxBookings} onChange={setMaxBookings} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label="Select day" holder="Choose class day..." value={day || { id: '', name: '' }} onChange={setDay} options={ListDay} />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2">
                  <InputTime label="Start time" value={startTime} onChange={setStartTime} />
                </div>
              </div>

              <div className="col-span-3">
                <div className="mt-2">
                  <InputTime label="End time" value={endTime} onChange={setEndTime} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button 
            onClick={onClose}
            type="button" 
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save data
          </button>
          {/* {
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
          } */}
        </div>
      </form>
    </React.Fragment>
  )
}

export default FormSchedule