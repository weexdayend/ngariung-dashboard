import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '@/components/input_fields';
import InputTime from '@/components/input_time';
import ListDropdown from '@/components/list_dropdown';
import NumberField from '@/components/number_fields';

import DateField from '@/components/date_fields';
import ComboboxDropdown from '@/components/combobox_fileds';

interface Instructor {
  id: string,
  name: string,
  phone?: string
}

interface Slot {
  pic: Instructor;
  eventName: string,
  eventCategory: { id: string, name: string };
  eventType: { id: string, name: string };
  startTime: string;
  endTime: string;
  maxBookings: number;
  room: { id: string, name: string };
  currentBookings: number;
  bookings: [];
}

interface ClassSchedule {
  date: string;
  outlet: { id: string, name: string };
  schedule: Slot[];
}

interface DropDownList {
  id: string | '';
  name: string | '';
  phone?: string | '';
}

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  item: any;
  eventData: any
  outletData: any;
  eventCategoryData: any;
  eventTypeData: any
}

function FormSchedule({ onClose, onUpdated, item, eventData, outletData, eventCategoryData, eventTypeData }: Props) {
  const [eventCategory, setEventCategory] = useState({ id: '', name: '' })
  const [eventType, setEventType] = useState({ id: '', name: '' })

  const [stepForm, setStepForm] = useState<number>(0)

  const [eventName, setEventName] = useState<DropDownList>({ id: '', name: '' });
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [maxBookings, setMaxBookings] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState('');

  const [selectOutlet, setSelectOutlet] = useState({ id: '', name: '' })
  const [selectInstructor, setSelectInstructor] = useState<DropDownList>({ id: '', name: '', phone: '' })
  const [selectRoom, setSelectRoom] = useState({ id: '', name: '' })
  
  const [itemEmployee, setItemEmployee] = useState<any[]>([]);
  const [itemRoom, setItemRoom] = useState<any[]>([]);

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);
  const [formattedDataArray, setFormattedDataArray] = useState<any[]>([])

  const [formattedEventCategory, setFormattedEventCategory] = useState<any[]>([])
  const [formattedEventType, setFormattedEventType] = useState<any[]>([])

  useEffect(() => {
    if (outletData) {
      const format = outletData.data.map((dataItem: any) => {
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
      
      setFormattedDataArray(format)
    }
    if (eventCategoryData && eventTypeData) {
      const formatCategory = eventCategoryData.data.map((item: any) => ({
        id: item.id,
        name: item.nameCategory
      }))
      const formatType = eventTypeData.data.map((item: any) => ({
        id: item.id,
        name: item.nameType
      }))

      setFormattedEventCategory(formatCategory)
      setFormattedEventType(formatType)
    }
    if (item) {
      setEventName(item.eventName);
      setStartTime(item.startTime);
      setEndTime(item.endTime);
      setMaxBookings(item.maxBookings);
      setSelectedDate(item.eventDate);
      setSelectOutlet(item.outlet);
      setSelectInstructor(item.pic);
      setSelectRoom(item.room);
      setEventType(item.eventType);
      setEventCategory(item.eventCategory);
    }
  }, [outletData, eventCategoryData, eventTypeData]);

  useEffect(() => {
    if(item){
      const hasDataChanged =
        item.eventName !== eventName ||
        item.startTime !== startTime ||
        item.endTime !== endTime ||
        item.maxBookings !== maxBookings ||
        item.eventDate !== selectedDate ||
        item.outlet !== selectOutlet ||
        item.pic !== selectInstructor ||
        item.room !== selectRoom ||
        item.eventType !== eventType ||
        item.eventCategory !== eventCategory;

      setDataChanged(hasDataChanged);
    }
  }, [item])

  useEffect(() => {
    if (selectOutlet.id !== '' && selectOutlet.name !== '') {
      const filteredOutlet = formattedDataArray.find((outlet: any) => outlet.name === selectOutlet.name);

      if (filteredOutlet) {
        setItemEmployee(filteredOutlet.employees);
        setItemRoom(filteredOutlet.rooms);
      }

    }
  }, [selectOutlet]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = newData ? `${process.env.API_URL}schedule/register` : `${process.env.API_URL}schedule/update`;

    const newSlot: Slot = {
      pic: selectInstructor,
      eventName: eventName.name,
      eventCategory: eventCategory,
      eventType: eventType,
      startTime,
      endTime,
      maxBookings,
      room: selectRoom,
      currentBookings: 0,
      bookings: [],
    };
  
    const newSchedule: ClassSchedule = {
      date: selectedDate,
      outlet: selectOutlet,
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

  useEffect(() => {
    if (newData) {
      setSelectInstructor({ id: '', name: '', phone: ''});
      setSelectRoom({ id: '', name: '' });
    }
  }, [selectOutlet])

  const isAnyFieldEmpty = !eventName ||
                          !startTime ||
                          !endTime ||
                          !maxBookings ||
                          !selectedDate ||
                          !selectOutlet ||
                          !selectInstructor ||
                          !selectRoom;

  const ButtonSectionFirst = () => {
    const firstSection = !selectOutlet.name || !eventCategory.name
    return (
      <div className="mt-12 flex items-center justify-end gap-x-6">
        <button 
          onClick={onClose}
          type="button" 
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setStepForm(1)}
          disabled={firstSection}
        >
          Next
        </button>
      </div>
    )
  }

  const ButtonSectionSecond = () => {
    return (
      <div className="mt-12 flex items-center justify-end gap-x-6">
        <button 
          onClick={() => setStepForm(0)}
          type="button" 
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Back
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
    )
  }

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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Schedule Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your schedule, make sure you have already to input your Employee and Room data.</p>
            
            {
              stepForm === 0 && (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <div className="mt-2">
                    <ListDropdown label="Select outlet" holder="Choose outlet first..." value={selectOutlet} onChange={setSelectOutlet} options={formattedDataArray} />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <div className="mt-2">
                    <ListDropdown label="Select category event" holder="Choose your event category..." value={eventCategory} onChange={setEventCategory} options={formattedEventCategory} />
                  </div>
                </div>
              </div>
              )
            }
            {
              stepForm === 1 && (
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-full">
                  <div className="mt-2">
                    <DateField label="Select a date" holder="Select a date" value={selectedDate} onChange={setSelectedDate} />
                  </div>
                </div>

                <div className="sm:col-span-full">
                  <div className="mt-2">
                    <ComboboxDropdown label="Schedule name" value={eventName} onChange={setEventName} options={eventData.data} holder={''} />
                  </div>
                </div>

                <div className="col-span-full">
                  <div className="mt-2">
                    <ListDropdown label="Select PIC" holder="Who's person in contact?" value={selectInstructor} onChange={setSelectInstructor} options={itemEmployee} />
                  </div>
                </div>

                <div className="col-span-full">
                  <div className="mt-2">
                    <ListDropdown label="Select room" holder="Where's the room?" value={selectRoom} onChange={setSelectRoom} options={itemRoom} />
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="mt-2">
                    <NumberField label="Pax" value={maxBookings} onChange={setMaxBookings} />
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="mt-2">
                    <InputTime label="Start time" value={startTime} onChange={setStartTime} />
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="mt-2">
                    <InputTime label="End time" value={endTime} onChange={setEndTime} />
                  </div>
                </div>

                <div className="w-full col-span-full mt-6">
                  <div className="flex flex-row items-center overflow-hidden flex-wrap gap-2">
                    {formattedEventType.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => setEventType(item)}
                        className={`flex flex-row items-center w-fit px-3 py-2 cursor-pointer rounded-full ${
                          item.name === eventType.name
                            ? 'bg-gradient-to-r from-indigo-400 to-rose-400'
                            : 'bg-gray-400'
                        }`}
                      >
                        <p className="text-white font-bold text-xs ml-1 pr-1">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              )
            }
          </div>
        </div>
        
        {
          stepForm === 0 && (<ButtonSectionFirst />)
        }
        {
          stepForm === 1 && (<ButtonSectionSecond />)
        }
        
      </form>
    </React.Fragment>
  )
}

export default FormSchedule