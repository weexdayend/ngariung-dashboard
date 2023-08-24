import { selectMenu, selectedExpanded, setExpandedMenu } from '@/utils/menuReducers';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

interface DashboardProps {
}

function TitleCard({}: DashboardProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  const [businessName, setBusinessName] = useState(null);
  
  const expandedMenu = useSelector(selectedExpanded);

  const handleRoute = () => {
    dispatch(setExpandedMenu(expandedMenu === 'Settings' ? null : 'Settings'));
    dispatch(selectMenu({ menu: 'Settings', subMenu: 'Business Settings', menuId: 7, subMenuId: 72 }));
    
    router.push('settings/business')
  }

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get('/api/business/get');
        const businessData = response.data;

        if (businessData) {
          // Data exists, update state
          setBusinessName(businessData.businessName);
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, []);

  return (
    <div className='col-span-2 px-4 py-10'>
      {
        businessName != null ? (
          <React.Fragment>
            <h1 className='text-5xl font-bold'>{businessName}</h1>
            <h4 className='text-base font-normal text-blue-950/50'>Sales overview today for this month, real-time data analytics.</h4>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 onClick={() => handleRoute()} className='text-2xl font-bold text-indigo-600 cursor-pointer hover:text-indigo-500'>Siap untuk Memulai Petualangan Bisnis?</h1>
            <h4 className='text-base font-normal text-blue-950/50'>Belum ada data bisnis yang bisa kami tampilkan.</h4>
          </React.Fragment>
        )
      }
    </div>
  )
}

export default TitleCard