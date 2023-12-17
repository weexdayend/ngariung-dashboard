import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'

import { Toaster, toast } from 'react-hot-toast';

import InputField from '@/components/input_fields';
import SwitchButton from '@/components/switch_button';

import {
  TrashIcon
} from '@heroicons/react/outline'
import DateField from '@/components/date_fields';
import ListDropdown from '@/components/list_dropdown';
import TextAreaField from '@/components/textarea_fields';
import InputTime from '@/components/input_time';

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  item: any;
  dataType: any;
  dataCategory: any
}

function FormEvents({ onClose, onUpdated, item, dataType, dataCategory }: Props) {
  const [EventName, setEventName] = useState<string>('')
  const [EventDate, setEventDate] = useState<string>('')
  const [EventType, setEventType] = useState({ id: '', name: '' })
  const [EventCategory, setEventCategory] = useState({ id: '', name: '' })
  const [EventVenue, setEventVenue] = useState<string>('')
  const [EventAddress, setEventAddress] = useState<string>('')
  const [EventDesc, setEventDesc] = useState<string>('')
  const [EventStatus, setEventStatus] = useState<boolean>(false)
  const [EventStart, setEventStart] = useState<string>('')
  const [EventEnd, setEventEnd] = useState<string>('')

  const [typeData, setTypeData] = useState([])
  const [categoryData, setCategoryData] = useState([])

  useEffect(() => {
    if(dataType){
      const manipulatedDataType = dataType.data.map((item: any) => ({
        id: item.EventTypeID,
        name: item.EventTypeName
      }));
      
      setTypeData(manipulatedDataType)
    }
    if(dataCategory){
      const manipulatedDataCategory = dataCategory.data.map((item: any) => ({
        id: item.EventCategoryID,
        name: item.EventCategoryName
      }));

      setCategoryData(manipulatedDataCategory)
    }
  }, [dataType, dataCategory])

  const [newData, setNewData] = useState(!item)
  const [dataChanged, setDataChanged] = useState(false);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageData, setImageData] = useState<{ base64: string; name: string; size: number }[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    Promise.all(
      selectedFiles.map((file) => {
        return new Promise<{ base64: string; name: string; size: number }>(
          (resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
              const base64 = reader.result as string;
              const name = file.name;
              const size = file.size;
              resolve({ base64, name, size });
            };

            reader.onerror = (error) => {
              reject(error);
            };

            reader.readAsDataURL(file);
          }
        );
      })
    )
      .then((imageDataArray: { base64: string; name: string; size: number }[]) => {
        const updatedSelectedImages = [...selectedImages, ...selectedFiles];
        setSelectedImages(updatedSelectedImages);

        const updatedImageData = [...imageData, ...imageDataArray];
        setImageData(updatedImageData);

        if (inputRef.current) {
          inputRef.current.value = ''; // Clear the input value
        }
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };


  const deleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  
    const updatedImageData = [...imageData];
    updatedImageData.splice(index, 1);
    setImageData(updatedImageData);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
  
    const selectedFiles = Array.from(files);
  
    Promise.all(
      selectedFiles.map((file) => {
        return new Promise<{ base64: string; name: string; size: number }>(
          (resolve, reject) => {
            const reader = new FileReader();
  
            reader.onload = () => {
              const base64 = reader.result as string;
              const name = file.name;
              const size = file.size;
              resolve({ base64, name, size });
            };
  
            reader.onerror = (error) => {
              reject(error);
            };
  
            reader.readAsDataURL(file);
          }
        );
      })
    )
      .then((imageDataArray: { base64: string; name: string; size: number }[]) => {
        const updatedSelectedImages = [...selectedImages, ...selectedFiles];
        setSelectedImages(updatedSelectedImages);
  
        const updatedImageData = [...imageData, ...imageDataArray];
        setImageData(updatedImageData);
  
        if (inputRef.current) {
          inputRef.current.value = ''; // Clear the input value
        }
      })
      .catch((error) => {
        console.error("Error reading image files:", error);
      });
  };

  useEffect(() => {
    if (item) {
      setEventName(item.EventName || '');
      setEventDate(item.EventDate || '');
      setEventType({ id: item.EventType.id, name: item.EventType.name } || { id: '', name: ''});
      setEventCategory({ id: item.EventCategory.id, name: item.EventCategory.name } || { id: '', name: ''});
      setEventVenue(item.EventDesc.venue || '')
      setEventAddress(item.EventDesc.address || '')
      setEventDesc(item.EventDesc.desc || '')
      const imageMetadataArray = item.EventImage.map((imageData: any) => {
        const base64 = imageData.base64; // Replace with the correct key for base64 data
        const name = imageData.name; // Replace with the correct key for the image name
        const size = imageData.size; // Replace with the correct key for the image size
      
        return { base64, name, size };
      });
      setImageData(imageMetadataArray)
      setEventStatus(item.EventTypeStatus || false);
      setEventStart(item.EventStart || '');
      setEventEnd(item.EventEnd || '');
    }
  }, [item]);

  useEffect(() => {
    if (item) {
      const hasDataChanged = 
        item.EventTypeName !== EventName ||
        item.EventTypeStatus !== EventStatus;

      setDataChanged(hasDataChanged)
    }
  }, [item, EventName, EventStatus])

  const isAnyFieldEmpty = !EventName

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = newData ? `${process.env.API_URL}event/register` : `${process.env.API_URL}event/update`;

    const body: any = {
      EventName: EventName,
      EventDate: EventDate,
      EventType: EventType,
      EventCategory: EventCategory,
      EventDesc: { venue: EventVenue, address: EventAddress, desc: EventDesc },
      EventImage: imageData,
      EventMaxUser: 0,
      EventTime: { EventStart: EventStart, EventEnd: EventEnd }
    }

    if (!newData) {
      body['id'] = item.EventID;
      body['status'] = EventStatus
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
            <h2 className="text-base font-semibold leading-7 text-gray-900">Event Information</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about your event.</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <InputField label="Event name" value={EventName} onChange={setEventName} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <DateField label="Event date" value={EventDate} onChange={setEventDate} holder={'Select event date'} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label={'Event type'} holder={'Select your event type'} value={EventType} onChange={setEventType} options={typeData} />
                </div>
              </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <ListDropdown label={'Event category'} holder={'Select your event category'} value={EventCategory} onChange={setEventCategory} options={categoryData} />
                </div>
              </div>

              {
                EventType.name === 'Special' && (
                  <>
                  <div className="sm:col-span-full">
                    <div className="mt-2">
                      <InputField label="Event venue" value={EventVenue} onChange={setEventVenue} />
                    </div>
                  </div>

                  <div className="sm:col-span-full">
                    <div className="mt-2">
                      <InputField label="Event address" value={EventAddress} onChange={setEventAddress} />
                    </div>
                  </div>
                  </>
                )
              }

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <TextAreaField label="Event descriptions" holder="Write here your event descriptions to inform the user..." value={EventDesc} onChange={setEventDesc} />
                </div>
              </div>

              <div className="col-span-3">
                  <div className="mt-2">
                    <InputTime label="Start time" value={EventStart} onChange={setEventStart} />
                  </div>
                </div>

                <div className="col-span-3">
                  <div className="mt-2">
                    <InputTime label="End time" value={EventEnd} onChange={setEventEnd} />
                  </div>
                </div>

              <div className="sm:col-span-full">
                <div className="mt-2">
                  <label className="block text-gray-600 text-sm">
                    Event Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      ref={inputRef}
                      className="hidden"
                    />
                    <div
                      className="relative mt-2 border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer"
                      onDrop={handleDrop}
                    >
                      <span className="ml-2" aria-hidden="true">
                        {imageData.length === 0
                          ? 'No files selected'
                          : `${imageData.length} file(s) selected`}
                      </span>
                      <p className="mt-2 text-gray-500 text-sm">Drag and drop files here or click to select.</p>
                    </div>
                  </label>
                  <div className="grid grid-cols-1 gap-4 mt-4">
                    {imageData.map((image, index) => (
                      <div key={index} className="flex flex-row justify-between items-center px-2 py-2 bg-blue-50 rounded-xl">
                        <div className="flex flex-row items-center">
                          <img
                            src={image.base64}
                            alt={`Uploaded Image ${index + 1}`}
                            className="w-14 h-14 rounded-xl mr-2 object-cover"
                          />
                          <div className="flex flex-col">
                            <p className="text-sm font-medium">{image.name}</p>
                            <p className="text-xs text-gray-500">
                              Size: {(image.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <TrashIcon onClick={() => deleteImage(index)} className="h-4 text-red-500 hover:text-red-600 cursor-pointer mr-4" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {
            !newData && (
              <div className="border-b border-gray-900/10 pb-12 space-y-12">  
                <div className="sm:col-span-full">
                  <SwitchButton label="Setting activation room" enabled={EventStatus} onChange={setEventStatus} />
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

export default FormEvents