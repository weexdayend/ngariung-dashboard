import React from 'react'

function ViewDataInventory() {
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">View Data</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Here it is the data what you are looking for!
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Category
              </label>
              <h1 className='text-base font-semibold'>Otomotive</h1>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Brand
              </label>
              <h1 className='text-base font-semibold'>Mitshubishi</h1>
            </div>
            
            <div className="sm:col-span-6 bg-gray-200 rounded-xl h-80 w-full">
            </div>
            
            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Product
              </label>
              <h1 className='text-base font-semibold'>Xpander</h1>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Type
              </label>
              <h1 className='text-base font-semibold'>Exceed CVT</h1>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Base Price
              </label>
              <h1 className='text-base font-semibold'>280.700.000</h1>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Total Value
              </label>
              <h1 className='text-base font-semibold'>2.582.000.000</h1>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Quantity
              </label>
              <h1 className='text-base font-semibold'>10</h1>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Tax
              </label>
              <h1 className='text-base font-semibold'>10%</h1>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                Service
              </label>
              <h1 className='text-base font-semibold'>15%</h1>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default ViewDataInventory