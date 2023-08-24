import React from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function StatsCardThree() {
  return (
    <>
    <div className="flex flex-col items-center justify-between px-6 py-8 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <div className="flex-col px-8 space-y-4">
        <h1 className="items-center text-center text-base font-medium text-blue-950">Leads Conversion</h1>
        <h3 className="w-64 items-center text-center text-sm font-normal text-blue-950/30">
          Discover your stats, and learn more about your business users.
        </h3>
      </div>

      <div className="flex items-center justify-center mt-6">
        <div className="w-32">
          <CircularProgressbar
            value={90}
            text={`${90}%`}
            styles={buildStyles({
              pathColor: `rgba(59, 130, 246, 1)`,
              textColor: `rgba(8, 47, 73, 1)`,
              trailColor: `rgba(209, 213, 219, 0.3)`,
            })}
          />
        </div>
      </div>
    </div>
    </>
  )
}

export default StatsCardThree