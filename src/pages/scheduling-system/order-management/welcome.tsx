import React, { useState } from 'react'

import {
  CalendarIcon,
  HandIcon,
  ClockIcon,
  CameraIcon,
  CheckIcon,
} from '@heroicons/react/outline'

import { formatCurrency } from '@/utils/formatCurrency'
import { Calendar } from 'react-date-range';
import { Toaster, toast } from 'react-hot-toast';

import Card from './card'

import axios from 'axios';

interface CardProps {
  id: string
  schedule: string
}

type Props = {
  data: any
}

const includedFeatures = [
  'Private access',
  'Waktu pertemuan kapan saja',
  'Gratis minum setiap 1x pertemuan',
  'Bebas memilih kelas',
]

function Welcome({ data }: Props) {

  const [customerName, setCustomerName] = useState('')
  const [stepForm, setStepForm] = useState(0)

  const [selectedDate, setSelectedDate] = useState(new Date());

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const handleSelect = (date: any) => {
    setSelectedDate(date);
  };

  const handleFirstStep = () => {
    setStepForm(1)
  }

  // const setNextStep = async (e: CardProps) => {
  //   const endpoint = `${process.env.API_URL}book/register`

  //   const body: any = {
  //     customerName,
  //     eventId: e.id,
  //     scheduleId: e.schedule,
  //   };

  //   const responsePromise = new Promise(async (resolve, reject) => {
  //     try {
  //       const response = await axios.post(endpoint, body)
  //       resolve(response.data);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   });

  //   await toast.promise(
  //     responsePromise, // Resolve with the response data
  //     {
  //       loading: 'Updating your data...',
  //       success: (response: any) => {
  //         return response.message;
  //       },
  //       error: (e: any) => {
  //         return e.response?.data?.error
  //       },
  //     }
  //   );
  // }

  return (
    <div className="relative isolate overflow-hidden w-full min-h-screen bg-gray-900 py-4 sm:py-24 lg:py-12 rounded-3xl">
      {
        stepForm === 0 && (        
        <div className="mx-auto max-w-full px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="max-w-xl lg:max-w-lg my-auto">
              <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">Selamat datang di <span className="font-bold">Sarana Group</span>.</h2>
              <p className="mt-4 text-lg leading-8 text-gray-300">
                Sebelum kamu memulai ber-<span className="font-bold">aktivitas</span> di <span className="font-bold">Sarana Senam</span> dan <span className="font-bold">Studio Foto</span>, silahkan isi terlebih dahulu nama kamu di bawah ini ya!
              </p>
              <div className="mt-6 flex max-w-md gap-x-4">
                <label htmlFor="full-name" className="sr-only">
                  Nama Lengkap
                </label>
                <input
                  id="full-name"
                  name="full-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="min-w-0 flex-auto rounded-full border-0 bg-white/5 px-5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  placeholder="Nama Lengkap"
                />
                <button
                  onClick={handleFirstStep}
                  className="flex-none rounded-full bg-indigo-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">Daily activity</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Kelas senam setiap harinya, dengan beragam kelas yang tersedia.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <HandIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">Professional Instructor</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Instruktur profesional di setiap kelas senam yang ada.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">Always on-time</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Kelas dimulai selalu tepat waktu, sesuai dengan jadwal yang tertera.
                </dd>
              </div>
              <div className="flex flex-col items-start">
                <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                  <CameraIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-white">Studio Photo</dt>
                <dd className="mt-2 leading-7 text-gray-400">
                  Tersedia studio foto profesional yang bisa kamu sewa.
                </dd>
              </div>
            </dl>
          </div>
          <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold tracking-tight text-white">Membership Kelas Senam</h3>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-white sm:grid-cols-2 sm:gap-6"
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-gray-50 py-4 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center h-full">
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600">Hanya bayar sekali</p>
                  <p className="mt-6 flex flex-col items-center justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">{formatCurrency(120000)}</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">8x pertemuan</span>
                  </p>
                  <a
                    href="#"
                    className="mt-10 block w-full rounded-full bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Daftar Membership
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }
      {
        stepForm === 1 && (
        <div className='mx-auto max-w-full px-12 lg:px-12 grid grid-cols-2'>
          <div className='w-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100/20'>
            <div className="flex flex-col w-fit space-y-2">
              <div className="w-fit">
                <Calendar
                  date={selectedDate}
                  minDate={currentDate}
                  onChange={handleSelect}
                />
              </div>
            </div>
          </div>
          <div className='w-fit'></div>
          <div className="col-span-full space-y-4 mt-6">
            <Card data={data.data} date={selectedDate} />
          </div>
        </div>
        )
      }
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  )
}

export default Welcome