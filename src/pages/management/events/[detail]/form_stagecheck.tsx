import React, { useEffect, useState } from 'react'

type Props = {
  onClose: () => void;
  onUpdated: () => void;
  EventStageID: any;
  item: any;
  stageName: any;
}

export default function FormStageCheck({ onClose, onUpdated, EventStageID, item, stageName }: Props) {

  const itemsPerPage = 5; // Adjust the number of items to display per page as needed
  const [currentPage, setCurrentPage] = useState(1);

  // Check if 'item' exists before proceeding
  if (!item || !Array.isArray(item) || item.length === 0) {
    return (
      <div className="text-red-500">
        Error: No valid data provided. Please check the 'item' prop.
      </div>
    );
  }

  const sortedItem = [...item].sort((a, b) => a.user.name.localeCompare(b.user.name));

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to get only the items for the current page
  const paginatedItem = sortedItem.slice(startIndex, endIndex);

  return (
    <div className="space-y-12">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Checkpoint Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Here it is the information list of user in <span className="font-bold">{stageName}</span>.</p>
          
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              {paginatedItem.map((list: any, index: number) => (
                <div key={index} className="flex flex-col gap-4">
                  {/* Use conditional rendering to avoid undefined property */}
                  {list.stages &&
                    list.stages
                      .filter((filter: any) => filter.stage === EventStageID)
                      .map((child: any, indChils: number) => (
                        <div
                          key={indChils}
                          className="flex flex-row items-center justify-between border-b-2 border-gray-200 mb-4 px-2 py-2"
                        >
                          <div className="flex flex-col">
                            <p className="text-sm text-gray-700 uppercase">{list.user.name}</p>
                            <p className="text-xs text-gray-400">@{list.user.username}</p>
                          </div>
                          <p className="text-sm text-gray-700">{child.status === 1 ? 'Done' : '-'}</p>
                        </div>
                      ))}
                </div>
              ))}
            </div>

            {/* Pagination controls */}
            <div className="col-span-full flex items-center justify-center">
              <button
                className={`px-4 py-2 mx-2 text-sm font-medium text-gray-700 ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-200'} rounded-md`}
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-sm font-medium text-gray-700">
                Page {currentPage} of {Math.ceil(sortedItem.length / itemsPerPage)}
              </span>
              <button
                className={`px-4 py-2 mx-2 text-sm font-medium text-gray-700 ${currentPage === Math.ceil(sortedItem.length / itemsPerPage) ? 'bg-gray-300' : 'bg-gray-200'} rounded-md`}
                onClick={() =>
                  setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(sortedItem.length / itemsPerPage)))
                }
                disabled={currentPage === Math.ceil(sortedItem.length / itemsPerPage)}
              >
                Next
              </button>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  )
}