import React, { useState } from 'react'
import DataPerformanceTeamCard from './data_performance_team_card';

import { PlusIcon, RefreshIcon } from '@heroicons/react/solid'

function PreformanceTeamCard() {
  const [profile, setProfileData] = useState([
    { id: 1, name: 'Kota Bandung', leads: '1000', conversion: '900', rate: '90%' },
    { id: 1, name: 'Bandung Barat', leads: '1000', conversion: '900', rate: '90%' },
    { id: 1, name: 'Bandung Timur', leads: '1000', conversion: '900', rate: '90%' },
  ]);

  const [visibleCount, setVisibleCount] = useState(3);

  const loadMore = () => {
    setVisibleCount(visibleCount + 3);
  };

  const allDataShown = visibleCount >= profile.length;
  
  return (
    <>
      {profile.slice(0, visibleCount).map((item) => (
        <DataPerformanceTeamCard key={item.id} data={item} />
      ))}
      {!allDataShown && (
        // <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={loadMore}>
        //   Load More
        // </button>
        <div 
          className="px-6 py-6 border-dotted border-2 border-blue-200 rounded-3xl cursor-pointer active:scale-95" 
          onClick={loadMore}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <RefreshIcon width={38} height={38} className='text-blue-500' />
            <p className='text-xs text-blue-500 font-medium mt-4'>Load More Data</p>
          </div>
        </div>
      )}
    </>
  )
}

export default PreformanceTeamCard