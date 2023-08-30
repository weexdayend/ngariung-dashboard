import React from 'react'
import moment from 'moment';

import { formatCurrency } from '@/utils/formatCurrency';

interface CardProps {
  id: string;
  schedule: string;
}

type DataCardProps = {
  date: any
  data: any
};

function Card({ data, date, setNextStep }: DataCardProps & { setNextStep: (e: CardProps) => void }) {

  const formattedDate = moment(date).format('YYYY-MM-DD');
  const filteredData = data?.filter((item: any) => item.date === formattedDate);

  return (
    <>
      {
        filteredData.map((item: any, i: any) => (
          item.schedule.map((child: any) => (
          <div
            onClick={() => setNextStep({ id: item._id, schedule: child.scheduleId})}
            key={i+1} 
            className={`hover:z-50 group bg-white hover:shadow-xl hover:shadow-indigo-200/50 active:transition-transform duration-300 ease-in-out transform-gpu relative overflow-hidden h-fit rounded-3xl shadow-xl shadow-gray-100/10`}
          >
            <div className="p-4 px-8 grid grid-cols-3 w-full">
              <div className="flex flex-col">
                <h1 className={`text-sm font-normal text-blue-950 text-left`}><span className="font-bold">{child.eventName}</span> - {child.eventType.name}</h1>
                <p className={`text-sm font-normal text-blue-950/40 text-left`}>Instructor : {child.pic.name}</p>
              </div>
              <div className="flex flex-col">
                <h1 className={`text-sm font-normal text-blue-950 text-left`}><span className="font-bold">{item.outlet.name}</span> - {child.room.name}</h1>
                <p className={`text-sm font-normal text-blue-950/40 text-left`}>Time : {child.startTime} - {child.endTime}</p>
              </div>
              <div className="flex itemx-center justify-end">
                <h1 className={`text-2xl font-bold text-blue-950 text-rirght`}>{formatCurrency(child.prices.basePrice)}</h1>
              </div>
            </div>
          </div>
          ))
        ))
      }
    </>
  )
}

export default Card