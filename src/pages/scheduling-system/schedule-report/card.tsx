import React from 'react'

import Image from 'next/image'

import { formatCurrency } from '@/utils/formatCurrency';

type DataCardProps = {
  data: any;
};

const Card: React.FC<DataCardProps> = ({ data }) => {

  return (
    <>
      {
        data.map((item: any, i: any) => (
          <div key={i} className={`hover:z-50 group hover:shadow-xl hover:shadow-indigo-200/50 active:transition-transform duration-300 ease-in-out transform-gpu hover:scale-110 relative overflow-hidden px-6 py-6 ${item.rank === 1 ? 'bg-gradient-to-bl from-indigo-600 to-rose-400' : item.rank === 6 ? 'bg-red-50' : 'bg-gray-50'} rounded-3xl shadow-xl shadow-gray-100`}>
            {
              item.rank === 1 && (
                <>
                <Image
                  className="absolute opacity-20 -left-16 -top-16 rotate-90 transition-transform duration-300 ease-in-out transform-gpu hover:-translate-x-2 hover:-translate-y-2"
                  src="/assets/congratulation.png"
                  alt="Card Background"
                  width={250} height={250}
                  draggable="false"
                />
                <Image
                  className="absolute opacity-20 -right-16 -top-16 -rotate-90 transition-transform duration-300 ease-in-out transform-gpu hover:-translate-x-2 hover:-translate-y-2"
                  src="/assets/congratulation.png"
                  alt="Card Background"
                  width={250} height={250}
                  draggable="false"
                />
                </>
              )
            }
            <div className="flex flex-col items-center">
              <div className={`px-4 py-3.5 ${item.rank === 6 ? 'bg-rose-400' : 'bg-blue-950 '} rounded-full text-white mb-4`}>
                {item.rank}
              </div>
              <div className='flex flex-col items-center'>
                <h1 className={`text-lg font-medium ${item.rank === 1 ? 'text-white' : 'text-blue-950'}`}>{item.eventCategory}</h1>
              </div>
              <div className="bg-white rounded-xl p-4 grid grid-cols-2 w-full mt-8">
                <div className="flex flex-col justify-center items-center">
                  <h1 className={`text-xs font-medium ${item.rank === 1 ? 'text-indigo-600' : 'text-blue-950'}`}>{formatCurrency(item.totalEarnings)}</h1>
                  <p className={`text-xs font-normal ${item.rank === 1 ? 'text-black/50' : 'text-blue-950/40'}`}>Total Earnings</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className={`text-xs font-medium ${item.rank === 1 ? 'text-indigo-600' : 'text-blue-950'}`}>{formatCurrency(item.totalBooked)}</h1>
                  <p className={`text-xs font-normal ${item.rank === 1 ? 'text-black/50' : 'text-blue-950/40'}`}>Booked</p>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Card