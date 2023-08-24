import React, { useEffect, useState } from 'react'

import PanelComponent from '../../../../components/panel_component'
import FormSchedule from './form_schedule'


type Props = {
  onUpdated: () => void;
  token: any
  fitnessData: any
  outletData: any
}

const COLUMN = [
  '',
  'Class',
  'Type',
  'Instructor',
  'Time',
  'Outlet',
  'Room',
]

function TableClass({ onUpdated, token, fitnessData, outletData }: Props) {
  const [updated, setUpdated] = useState(false)

  function groupDataByDay(data: any) {
    const groupedData: any = {};
  
    data.forEach((item: any) => {
      const { day, ...rest } = item;
      if (!groupedData[day]) {
        groupedData[day] = [rest];
      } else {
        groupedData[day].push(rest);
      }
    });
  
    return groupedData;
  }

  const groupedData = groupDataByDay(fitnessData.data);

  useEffect(() => {
    if(updated){
      onUpdated()
      setUpdated(false)
    }
  }, [updated])

  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const handleClick = () => {
    setOpen(!open);
    setEditData(null)
  };

  const handleEdit = (item: any) => {
    setOpen(!open)
    setEditData(item)
  }

  const RenderFilter = () => {
    return (
      <>
        <div className='w-full flex justify-end py-4 px-4 mb-2 space-x-2 bg-gray-50 rounded-t-xl'>
          <button
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-500 hover:text-indigo-600"
            onClick={() => handleClick()}
          >
            Add new schedule
          </button>
        </div>
      </>
    )
  }

  const RenderTable = ({item}: any) => {
    return(
      <div className='row-span-1 w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
        <RenderFilter />
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              {COLUMN.map((column) => (
                <th key={column} className="py-3 px-6 text-left">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
          {Object.entries(groupedData).map(([day, items]: [string, any]) => (
            <React.Fragment key={day}>
              <tr className="bg-gray-50" key={day}>
                <td colSpan={8} className="px-6 py-3 font-semibold">{day}</td>
              </tr>
              {items.map((item: any, i: any) => {
                return(
                  <tr className='border-y' key={i}>
                    <td></td>
                    {
                      item.schedule.map((schedule: any) => (
                        <>
                          <td className="px-6 py-3 text-sm">{schedule.className}</td>
                          <td className="px-6 py-3 text-sm">{schedule.classType}</td>
                          <td className="px-6 py-3 text-sm">{schedule.instructor}</td>
                          <td className="px-6 py-3 text-sm">{`${schedule.startTime} - ${schedule.endTime}`}</td>
                          <td className="px-6 py-3 text-sm">{item.outletName}</td>
                          <td className="px-6 py-3 text-sm">{schedule.room}</td>
                        </>
                      ))
                    }
                  </tr>
                )
              })}
            </React.Fragment>
          ))}
            {/* {
              item.data.map((item: any, i: any) => (
                <React.Fragment>
                <tr className="bg-gray-50" key={i}>
                  <td colSpan={8} key={i} className="px-6 py-3 font-semibold">{item.day}</td>
                </tr>
                {
                  item.schedule.map((session: any, index: any) => (
                    <tr className='border-y' key={index}>
                      <td></td>
                      <td className="px-6 py-3">{session.className}</td>
                      <td className="px-6 py-3">{session.classType}</td>
                      <td className="px-6 py-3">{session.instructor}</td>
                      <td className="px-6 py-3">{`${session.startTime} - ${session.endTime}`}</td>
                      <td className="px-6 py-3">{session.outletName}</td>
                      <td className="px-6 py-3">{session.room}</td>
                    </tr>
                  ))
                }
                </React.Fragment>
              ))
            } */}
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <>
    <RenderTable item={groupedData} />
    {open && (
      <PanelComponent setOpen={setOpen}>
        <FormSchedule 
          onClose={() => setOpen(false)} 
          onUpdated={() => setUpdated(true)} 
          item={editData} 
          outletData={outletData} 
          token={token}
        />
      </PanelComponent>
    )}
    </>
  )
}

export default TableClass