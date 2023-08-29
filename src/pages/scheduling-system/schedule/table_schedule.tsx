import React, { useEffect, useState } from 'react'

import PanelComponent from '../../../components/panel_component'
import FormSchedule from './form_schedule'

import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

type Props = {
  onUpdated: () => void;
  eventData: any
  fitnessData: any
  outletData: any
  eventCategoryData: any
  eventTypeData: any
}

function TableClass({ onUpdated, eventData, fitnessData, outletData, eventCategoryData, eventTypeData }: Props) {
  const [updated, setUpdated] = useState(false)

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

  const RenderAgenda = () => {
    const myEventsList = fitnessData && fitnessData.data.flatMap((item: any) =>
      item.schedule.map((scheduleItem: any) => {
        const startDate = new Date(item.date);
        const startTimeParts = scheduleItem.startTime.split(":"); // Split the time string into hours and minutes
        const startDateTime = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          parseInt(startTimeParts[0]), // Convert hours to integer
          parseInt(startTimeParts[1]) // Convert minutes to integer
        );

        const endTimeParts = scheduleItem.endTime.split(":"); // Split the time string into hours and minutes
        const endDateTime = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate(),
          parseInt(endTimeParts[0]), // Convert hours to integer
          parseInt(endTimeParts[1]) // Convert minutes to integer
        );

        return {
          title: `${scheduleItem.eventName} - ${scheduleItem.eventType.name}`,
          start: startDateTime,
          end: endDateTime,
          outlet: item.outlet,
          pic: scheduleItem.pic,
          eventDate: item.date,
          eventName: scheduleItem.eventName,
          eventCategory: scheduleItem.eventCategory,
          eventType: scheduleItem.eventType,
          startTime: scheduleItem.startTime,
          endTime: scheduleItem.endTime,
          room: scheduleItem.room,
          maxBookings: scheduleItem.maxBookings,
          resourceId: item._id,
        };
      })
    );

    const handleEventSelect = (event: any) => {
      // Perform any action you want when an event is selected
      setEditData(event)
      setOpen(!open)
    };
    
    return(
      <div className='max-w-full h-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
        <RenderFilter />
        <Calendar
          onSelectEvent={handleEventSelect}
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    )
  }

  return (
    <>
    <RenderAgenda />
    {open && (
      <PanelComponent setOpen={setOpen}>
        <FormSchedule 
          onClose={() => setOpen(false)} 
          onUpdated={() => setUpdated(true)} 
          item={editData} 
          eventData={eventData}
          outletData={outletData} 
          eventCategoryData={eventCategoryData}
          eventTypeData={eventTypeData}
        />
      </PanelComponent>
    )}
    </>
  )
}

export default TableClass