import React, { useState } from 'react'

import { DateRange } from 'react-date-range';

function FilterCard() {

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const clearSelect = () => {
    setStartDate(new Date())
    setEndDate(new Date())
  }

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  }
  
  return (
    <div className='w-fit px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100'>
      <div className='flex flex-col w-full'>
        <div className='flex flex-col w-full'>
          <div className="flex flex-row w-full space-x-2 items-center mb-4">
            <label htmlFor="product" className="block text-base font-semibold text-gray-900">
              Team :
            </label>
            <div className="">
              <select
                id="product"
                name="product"
                autoComplete="product-name"
                className="w-full px-2 bg-white text-blue-500 text-base font-semibold"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col w-fit space-y-2">
            <div className="w-fit">
              <DateRange
                ranges={[selectionRange]}
                onChange={handleSelect}
                rangeColors={['#6366f1']}
                moveRangeOnFirstSelection={false}
                direction="horizontal"
                editableDateInputs={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-end space-x-2 w-full'>
        <div className='flex flex-row space-x-2'>
        <button
          type="button"
          className="w-full inline-flex items-center rounded-md border border-indigo-500 px-3 py-2 text-sm text-indigo-500 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          onClick={clearSelect}
        >
          Clear
        </button>
        <button
          type="button"
          className="w-full inline-flex items-center rounded-md border bg-indigo-500 px-3 py-2 text-sm text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
        </div>
      </div>
    </div>
  )
}

export default FilterCard