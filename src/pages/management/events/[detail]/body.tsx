import React, { useEffect, useState, Fragment, useCallback } from 'react'

import PanelComponent from '@/components/panel_component'
import FormTrivia from './form_trivia'
import FormCheckpoint from './form_checkpoint'

import { Popover, Transition } from '@headlessui/react'
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import supabase, { DbResult } from '@/db/supabase';

import {
  TrashIcon,
  PencilIcon,
  ChevronDownIcon
} from '@heroicons/react/outline'

type Props = {
  onUpdated: () => void;
  EventID: any
  dataEvent: any
  dataStage: any
  dataTrivia: any
}

export default function Body({ onUpdated, EventID, dataEvent, dataStage, dataTrivia }: Props) {
  const [updated, setUpdated] = useState(false)

  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  const [form, setForm] = useState('')

  const handleOnUpdated = useCallback(() => {
    onUpdated();
  }, [onUpdated]);
  
  useEffect(() => {
    if (updated) {
      handleOnUpdated();
      setUpdated(false);
    }
  }, [updated, handleOnUpdated]);

  const handleClick = (form: any) => {
    setOpen(!open)
    setEditData(null)
    setForm(form)
  }

  const editCheckpoint = (item: any, form: any) => {
    setOpen(!open)
    setEditData(item)
    setForm(form)
  }

  const editTrivia = (item: any, form: any) => {
    setOpen(!open)
    setEditData(item)
    setForm(form)
  }

  const assigned = async (EventTriviaID: any, EventStageID: any) => {
    const endpoint = `/api/event/assign-trivia`;
    const body: any = {
      EventTriviaID: EventTriviaID,
      EventStageID: EventStageID,
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

  return (
    <div className="w-full grid grid-flow-row grid-cols-2 gap-4">
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

      <div className="w-full h-fit px-4 py-4 flex flex-col gap-4 rounded-xl">
        <p className="text-xs font-light text-zinc-600">{dataEvent[0].EventDate}, {dataEvent[0].EventTime.EventStart} - {dataEvent[0].EventTime.EventEnd}</p>
        <h1 className="text-lg font-bold">{dataEvent[0].EventName}</h1>
        <p className="text-sm text-zinc-600">{dataEvent[0].EventDesc.desc}</p>
        <p className="text-xs text-zinc-600">{dataEvent[0].EventDesc.venue} {dataEvent[0].EventDesc.address}</p>
        <p className="text-sm text-zinc-600">Max Participant : {dataEvent[0].EventMaxUser}</p>
        <div className="w-full flex flex-wrap flex-row gap-2">
          <div className="px-4 py-1 bg-yellow-400 rounded-full">
            <p className="text-sm text-indigo-600">{dataEvent[0].EventType.name}</p>
          </div>
          <div className="px-4 py-1 bg-indigo-100 rounded-full">
            <p className="text-sm text-indigo-600">{dataEvent[0].EventCategory.name}</p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-4">
        {
          dataEvent[0].EventImage.map((image: any, index: any) => (
          <div key={index} className="flex flex-row justify-between items-center px-2 py-2 bg-blue-50 rounded-xl">
            <div className="flex flex-row items-center">
              <img
                src={image.base64}
                alt={`Uploaded Image ${index + 1}`}
                className="w-14 h-14 rounded-xl mr-2 object-cover"
              />
            </div>
          </div>
          ))
        }
        </div>
      </div>

      <div className="w-full col-span-full h-fit px-4 py-4 flex flex-col gap-4 rounded-xl mt-6">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold">Stage or Level List</h1>
          <p onClick={() => handleClick('checkpoint')} className="text-indigo-600">Add new checkpoint</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {
            dataStage && dataStage
              .slice() // Create a shallow copy to avoid mutating the original array
              .sort((a: any, b: any) => {
                // Compare the EventStageName values
                const nameA = a.EventStageName.toLowerCase();
                const nameB = b.EventStageName.toLowerCase();
          
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              .map((item: any, index: any) => (
              <div key={index} className="flex flex-col px-4 py-6 gap-2 bg-blue-50 rounded-xl shadow-lg shadow-indigo-500/10">
                <div className="flex flex-row justify-between">
                  <div className="w-full">
                    <p className="text-sm text-indigo-600">{item.EventStageDesc.type}</p>
                  </div>

                  <div className="flex flex-row gap-2">
                    <PencilIcon onClick={() => editCheckpoint(item, 'checkpoint')} className="w-4 text-zinc-500" />
                    <TrashIcon className="w-4 text-red-500" />
                  </div>
                </div>
                <p className="text-base font-bold">{item.EventStageName}</p>
                <p className="text-sm font-medium">{item.EventStageDesc.clue}</p>
                {
                  item.EventStageDesc.type == 'Scan' ? (
                    <>
                      <p className="text-sm font-medium">QR Code / Token : {item.EventStageDesc.code}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium">Qeustion : {item.EventStageDesc.question}</p>
                      <p className="text-sm font-medium">Answer : {item.EventStageDesc.answer}</p>
                    </>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>

      <div className="w-full h-fit col-span-full px-4 py-4 flex flex-col gap-4 rounded-xl mt-6">
        <div className="w-full flex justify-between">
          <h1 className="text-3xl font-bold">Trivia or Question List</h1>
          <p onClick={() => handleClick('trivia')} className="text-indigo-600">Add new trivia</p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {
            dataTrivia && dataTrivia
              .slice()
              .sort((a: any, b: any) => {
                // Compare the EventStageName values
                const nameA = a.EventTriviaName.toLowerCase();
                const nameB = b.EventTriviaName.toLowerCase();
          
                if (nameA < nameB) {
                  return -1;
                }
                if (nameA > nameB) {
                  return 1;
                }
                return 0;
              })
              .map((item: any, index: any) => (
              <div key={index} className="flex flex-col px-4 py-6 gap-2 bg-indigo-50 rounded-xl shadow-lg shadow-indigo-500/10">
                <div className="flex flex-row justify-between">
                  <div className="w-full">
                    <p className={`text-sm ${item.EventTriviaArticle ? 'text-indigo-600' : 'text-orange-600'}`}>
                      {item.EventTriviaArticle ? 'With Article' : 'Without Article'}
                    </p>
                  </div>

                  <div className="flex flex-row gap-2">
                    <PencilIcon onClick={() => editTrivia(item, 'trivia')} className="w-4 text-zinc-500" />
                    <TrashIcon className="w-4 text-red-500" />
                  </div>
                </div>
                <p className="text-base font-bold">{item.EventTriviaName}</p>
                <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                        ${open ? '' : 'text-opacity-90'}
                        group inline-flex items-center rounded-md ${item.EventStage && item.EventStage ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-indigo-600'} px-2 py-1 text-sm font-medium`}
                    >
                      <span>{item.EventStage && item.EventStage ? 'Assigned' : 'Not assigned'}</span>
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
                            {
                              dataStage
                              .slice()
                              .sort((a: any, b: any) => {
                                // Compare the EventStageName values
                                const nameA = a.EventStageName.toLowerCase();
                                const nameB = b.EventStageName.toLowerCase();
                          
                                if (nameA < nameB) {
                                  return -1;
                                }
                                if (nameA > nameB) {
                                  return 1;
                                }
                                return 0;
                              })
                              .map((pop: any) => (
                              <div
                                onClick={() => {
                                  if(item.EventStage != pop.EventStageID){
                                    assigned(item.EventTriviaID, pop.EventStageID)
                                  }
                                }}
                                key={pop.EventStageName}
                                className={`-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out ${item.EventStage && item.EventStage == pop.EventStageID ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'hover:bg-gray-50 text-gray-600'} cursor-pointer`}
                              >
                                <div className="">
                                  <p className="text-sm font-medium">
                                    {pop.EventStageName}
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
              </div>
            ))
          }
        </div>
      </div>
      
      {
        open && (
          <PanelComponent setOpen={setOpen}>
            {
              form == 'checkpoint' && (
                <FormCheckpoint 
                  onClose={() => setOpen(false)} 
                  onUpdated={() => setUpdated(true)} 
                  EventID={EventID} 
                  item={editData} 
              />)
            }
            {
              form == 'trivia' && (
                <FormTrivia
                  onClose={() => setOpen(false)}
                  onUpdated={() => setUpdated(true)}
                  EventID={EventID}
                  item={editData}
                />
              )
            }
          </PanelComponent>
        )
      }
    </div>
  )
}