import React, { useEffect, useState, useRef } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'

import {
  CheckIcon,
  TrashIcon,
  XIcon,
} from '@heroicons/react/outline'

import InputField from '@/components/input_fields'
import TextAreaField from '@/components/textarea_fields';
import NumberField from '@/components/number_fields';

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  EventID: any
  item: any
}

const types = [
  {
    name: 'With Article',
    desc: 'Give an article for a participant to read then question',
  },
  {
    name: 'Without Article',
    desc: 'Just go with question without article',
  },
]

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

export default function FormTrivia({ onClose, onUpdated, EventID, item }: Props) {
  const [newData, setNewData] = useState(!item)

  const [type, setType] = useState('')

  const [title, setTitle] = useState('')
  const [article, setArticle] = useState('')
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState<any[''] | ['']>([''])
  const [answer, setAnswer] = useState('')
  const [otp, setOTP] = useState<string>('');

  const [pulse, setPulse] = useState<number>(0)

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageData, setImageData] = useState<{ base64: string; name: string; size: number }[]>(
    []
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleGenerateOTP = () => {
    const generatedOTP = generateOTP();
    setOTP(generatedOTP);
  };

  useEffect(() => {
    handleGenerateOTP()
  } , [])

  const handleSetType = (e: any) => {
    if (e === 'With Article') {
      setType(e)
    }

    if (e === 'Without Article') {
      setType(e)
    }
  }

  useEffect(() => {
    if (item) {
      if (item.EventTriviaArticle) {
        setType('With Article' || '')
      } else {
        setType('Without Article' || '')
      }
      setTitle(item.EventTriviaName || '')
      setPulse(item.EventTriviaPulse || 0)
      item.EventTriviaQuestion.map((quest: any) => {
        setQuestion(quest.question || '')
        setAnswer(quest.answer || '')
        setOptions(quest.options || [''])
      })
      if (item.EventTriviaArticle) {
        const imageMetadataArray = item.EventTriviaArticle.images.map((imageData: any) => {
          const base64 = imageData.base64; // Replace with the correct key for base64 data
          const name = imageData.name; // Replace with the correct key for the image name
          const size = imageData.size; // Replace with the correct key for the image size
        
          return { base64, name, size };
        });
        setImageData(imageMetadataArray)
        setArticle(item.EventTriviaArticle.article || '')
      }
      setOTP(item.EventTriviaCode || '')
    }
  }, [item]);

  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (item) {
      if (item.EventArticle) {
        const hasDataChanged = 
        item.EventTriviaName !== title ||
        item.EventTriviaPulse !== pulse ||
        item.EventTriviaQuestion.question !== question ||
        item.EventTriviaQuestion.answer !== answer ||
        item.EventTriviaQuestion.options !== options ||
        item.eventTriviaArticle.images !== imageData ||
        item.EventTriviaArticle.article !== article

      setDataChanged(hasDataChanged)
      } else {
        const hasDataChanged = 
        item.EventTriviaName !== title ||
        item.EventTriviaPulse !== pulse ||
        item.EventTriviaQuestion.question !== question ||
        item.EventTriviaQuestion.answer !== answer ||
        item.EventTriviaQuestion.options !== options

      setDataChanged(hasDataChanged)
      }
    }
  }, [item, title, pulse, question, answer, options, imageData, article])

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const endpoint = newData ? `${process.env.API_URL}event/register-trivia` : `${process.env.API_URL}event/update-trivia`

    let jsonb

    if (type === 'With Article') {
      jsonb = { images: imageData, article: article }
    }

    if (type === 'Without Article') {
      jsonb = null
    }

    const body: any = {
      EventTriviaName: title,
      EventTriviaArticle: jsonb,
      EventTriviaQuestion: [{ question: question, answer: answer, options: options }],
      EventTriviaCode: otp,
      EventTriviaPulse: pulse,
      EventID: EventID
    }

    if (!newData) {
      body['EventTriviaID'] = item.EventTriviaID
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

  const fieldEmptyQuestion = !question || !answer
  const fieldEmptyscan = !otp

  const addOption = () => {
    setOptions([...options, '']); // Add a new empty option
  };

  const removeOption = (index: any) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1); // Remove the option at the specified index
    setOptions(updatedOptions);
  };

  const handleOptionChange = (index: any, value: any) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value; // Update the value at the specified index
    setOptions(updatedOptions);
  };

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
          <h2 className="text-base font-semibold leading-7 text-gray-900">Trivia Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Give an information about trivia.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            {
              type === '' && (
                <div className="col-span-full">
                  <h1 className="text-sm font-bold">Select the type of trivia first!</h1>
                </div>
              )
            }

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

            {
              type !== '' && (
                <React.Fragment>
                  <div className="col-span-full">
                    <InputField label={'Input title'} value={title} onChange={setTitle} />
                  </div>

                  <div className="col-span-full">
                    <NumberField label={'Input points'} value={pulse} onChange={setPulse} />
                  </div>

                  <div className="col-span-full">
                    <InputField label={'Input question'} value={question} onChange={setQuestion} />
                  </div>

                  <div className="col-span-full">
                    <InputField label={'Input answer'} value={answer} onChange={setAnswer} />
                  </div>

                  <div className="col-span-full">
                  {options.map((option: any, index: any) => (
                    <div key={index} className="mb-4">
                      <InputField
                        label={`Option ${index + 1}`}
                        value={option}
                        onChange={(newValue) => handleOptionChange(index, newValue)}
                      />
                      <div className="flex flex-row gap-4">
                        <button type="button" onClick={() => addOption()} className="text-xs text-indigo-600">
                          + Add another option
                        </button>
                        {options.length > 1 && (
                          <button type="button" onClick={() => removeOption(index)} className="text-xs text-red-600">
                            - Remove this option
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  </div>

                  <div className="col-span-2">
                    <h1 className="text-base">Token : {otp}</h1>
                  </div>
                </React.Fragment>
              )
            }

            {
              type === 'With Article' && (
                <React.Fragment>
                  <div className="col-span-full">
                    <TextAreaField label={'Input article'} value={article} onChange={setArticle} holder={'Input article here...'} />
                  </div>

                  <div className="col-span-full">
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