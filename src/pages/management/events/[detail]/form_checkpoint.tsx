import React, { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'

import {
  CheckIcon
} from '@heroicons/react/outline'
import InputField from '@/components/input_fields'

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  EventID: any
  item: any
}

const types = [
  {
    name: 'Question',
    desc: 'Give an question for a participant to join the checkpoint',
  },
  {
    name: 'Scan',
    desc: 'Give an QR code for a participant to join the checkpoint',
  },
]

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export default function FormCheckpoint({ onClose, onUpdated, EventID, item }: Props) {
  const [newData, setNewData] = useState(!item)

  const [type, setType] = useState('')

  const [checkpoint, setCheckpoint] = useState('')
  const [clue, setClue] = useState('')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [otp, setOTP] = useState<string>('');

  const handleGenerateOTP = () => {
    const generatedOTP = generateOTP();
    setOTP(generatedOTP);
  };

  const handleSetType = (e: any) => {
    if (e === 'Question') {
      setOTP('')
      setType(e)
    }

    if (e === 'Scan') {
      setQuestion('')
      setAnswer('')
      setType(e)
    }
  }

  useEffect(() => {
    if (item) {
      setType(item.EventStageDesc.type || '')
      setCheckpoint(item.EventStageName || '')
      setClue(item.EventStageDesc.clue || '')
      setQuestion(item.EventStageDesc.question || '')
      setAnswer(item.EventStageDesc.answer || '')
      setOTP(item.EventStageDesc.code || '')
    }
  }, [item]);

  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (item) {
      const hasDataChanged = 
        item.EventStageDesc.type !== type ||
        item.EventStageName !== checkpoint ||
        item.EventStageDesc.clue !== clue ||
        item.EventStageDesc.question !== question ||
        item.EventStageDesc.answer !== answer ||
        item.EventStageDesc.code !== otp

      setDataChanged(hasDataChanged)
    }
  }, [item, type, checkpoint, clue, question, answer, otp])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = newData ? `${process.env.API_URL}event/register-stage` : `${process.env.API_URL}event/update-stage`;
    
    let jsonb

    if (type === 'Question') {
      jsonb = { type: type, clue: clue, question: question, answer: answer }
    }

    if (type === 'Scan') {
      jsonb = { type: type, clue: clue, code: otp }
    }

    const body: any = {
      EventStageName: checkpoint,
      EventStageDesc: jsonb,
      EventID: EventID
    }

    if (!newData) {
      body['EventStageID'] = item.EventStageID
    }

    try {
      const responsePromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(endpoint, body)
          resolve(response.data);
        } catch (error) {
          reject(error);
        }

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
      });
    } catch (error: any) {
      console.error(error.response.data.error);
    }
  }

  const fieldEmptyQuestion = !checkpoint || !clue || !question || !answer
  const fieldEmptyscan = !checkpoint || !clue || !otp

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Checkpoint Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about checkpoint.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div className="col-span-full">
              <RadioGroup value={type} onChange={e => handleSetType(e)}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-2">
                  {types.map((type) => (
                    <RadioGroup.Option
                      key={type.name}
                      value={type.name}
                      className={({ active, checked }) =>
                        `${
                          active
                            ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                            : ''
                        }
                        ${
                          checked ? 'bg-indigo-600 bg-opacity-75 text-white' : 'bg-white'
                        }
                          relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                      }
                    >
                      {({ active, checked }) => (
                        <>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label
                                  as="p"
                                  className={`font-medium  ${
                                    checked ? 'text-white' : 'text-gray-900'
                                  }`}
                                >
                                  {type.name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as="span"
                                  className={`inline ${
                                    checked ? 'text-sky-100' : 'text-gray-500'
                                  }`}
                                >
                                  <span className="text-xs">
                                    {type.desc}
                                  </span>
                                </RadioGroup.Description>
                              </div>
                            </div>
                            {checked && (
                              <div className="shrink-0 text-white">
                                <CheckIcon className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div className="col-span-full">
              <InputField label={'Input checkpoint name'} value={checkpoint} onChange={setCheckpoint} />
            </div>

            <div className="col-span-full">
              <InputField label={'Input clue'} value={clue} onChange={setClue} />
            </div>

            {
              type === 'Question' && (
                <React.Fragment>
                  <div className="col-span-full">
                    <InputField label={'Input question'} value={question} onChange={setQuestion} />
                  </div>

                  <div className="col-span-full">
                    <InputField label={'Input answer'} value={answer} onChange={setAnswer} />
                  </div>
                </React.Fragment>
              )
            }

            {
              type === 'Scan' && (
                <React.Fragment>
                  <div className="col-span-3">
                    <p className="text-center text-lg font-bold">{otp}</p>
                  </div>
                  <div className="col-span-3">
                    <p onClick={handleGenerateOTP} className="text-xs text-indigo-600 text-center cursor-pointer">Generate Code</p>
                  </div>
                </React.Fragment>
              )
            }

          </div>

        </div>

        {
          newData ? (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={type === 'Question' ? fieldEmptyQuestion : fieldEmptyscan}
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
  )
}