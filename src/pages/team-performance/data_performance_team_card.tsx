import React from 'react'
import Link from 'next/link'

import { useDispatch } from 'react-redux';
import { selectMenu } from '@/utils/menuReducers';

type DataCardProps = {
  data: {
    id: number;
    name: string;
    leads: string;
    conversion: string;
    rate: string;
  };
};

const DataPerformanceTeamCard: React.FC<DataCardProps> = ({ data }) => {

  const dispatch = useDispatch();

  const handleMenuItemClick = () => {     
    dispatch(selectMenu({menu: 'Dashboard', subMenu: 'Team Overview', menuId: 1, subMenuId: 12}));
  };

  return (
    <div className="px-6 py-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <div className="flex flex-col items-center">
        <div className="px-3 py-2 bg-blue-950 rounded-full text-white mb-4">IG</div>
        <Link href={'/team-overview'} className='flex flex-col items-center' onClick={handleMenuItemClick}>
          <h1 className="text-lg font-medium">{data.name}</h1>
        </Link>
        <div className="flex px-4 py-2 bg-blue-100 rounded-lg mt-8">
          <h3 className="text-xs font-semibold text-blue-400">Total Partner 10</h3>
        </div>
        <div className="grid grid-cols-3 w-full mt-8">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-base font-medium text-blue-950">{data.leads}</h1>
            <p className="text-xs font-normal text-blue-950/40">Leads</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-base font-medium text-blue-950">{data.conversion}</h1>
            <p className="text-xs font-normal text-blue-950/40">Win</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-base font-medium text-blue-950">{data.rate}</h1>
            <p className="text-xs font-normal text-blue-950/40">Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataPerformanceTeamCard