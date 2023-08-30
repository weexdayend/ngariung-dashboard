import React, { useState } from 'react'

import { DateRange } from 'react-date-range';

function FilterCard() {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.startDate)
  }

  const selectionRange = {
    startDate: startDate,
    endDate: startDate,
    key: "selection",
  }

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  return (
    <div className='w-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100/20'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col w-full'>
          <div className="flex flex-col w-fit space-y-2">
            <div className="w-fit">
              <DateRange
                ranges={[selectionRange]}
                minDate={currentDate} // Prevent selecting previous dates
                onChange={handleSelect}
                rangeColors={['#6366f1']}
                moveRangeOnFirstSelection={false}
                direction="horizontal"
                editableDateInputs={false} // Disable manual input of dates
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterCard