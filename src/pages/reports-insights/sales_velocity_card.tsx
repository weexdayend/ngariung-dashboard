import React from 'react'

interface SalesVelocityCardProps {
  averageTime: number;
}

const SalesVelocityCard: React.FC<SalesVelocityCardProps> = ({ averageTime }) => {
  return (
    <div className="px-6 py-6 bg-gradient-to-br from-purple-500 to-rose-400 rounded-3xl shadow-xl shadow-gray-100">
      <div className='flex flex-row items-center justify-between '>
        <h3 className="text-lg font-semibold text-white">Sales Velocity</h3>
        <p className="text-white font-bold text-2xl">{averageTime} days</p>
      </div>
      <p className='text-xs text-white'>The average time it takes for leads to move through the sales funnel.</p>
    </div>
  );
};

export default SalesVelocityCard