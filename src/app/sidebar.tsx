import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useSelector, useDispatch } from 'react-redux';
import { sidebarData } from './sidebarData';
import { selectedExpanded, setExpandedMenu } from '@/utils/menuReducers';

import { Heroicons } from './types';

import axios from 'axios';
import { useRouter } from 'next/router';

function Sidebar({}) {
  const [role, setRole] = useState<string>('')
  const expandedMenu = useSelector(selectedExpanded);

  const dispatch = useDispatch();

  const handleToggle = (menu: string) => {
    dispatch(setExpandedMenu(expandedMenu === menu ? null : menu));
  };

  const router = useRouter();
  const paths = router.asPath.split('/').filter((path) => path !== '');

  useEffect(() => {
    const fetchRole = async () => {
      const response = await axios.get(`${process.env.API_URL}getRole`);
      const data = response.data;

      setRole(data.role)
    }
    fetchRole()
  }, [])

  return (
    <>
      <div className={`bg-white inset-y-0 transition-transform delay-750 ease-in-out w-96 p-4`}>
        {/* Sidebar content goes here */}
        <div className={`bg-opacity-10 backdrop-filter backdrop-blur-xl px-4 py-4 flex flex-row justify-center items-center`}>
          <Image src="/assets/sales-tracker-logo.png" alt="My Image" width={80} height={80} />
        </div>

        {/* Grid 2: Submenu */}
        <div className="mt-10 space-y-3">
          {/* Retrieve the selected menu item */}
          {sidebarData.map((menuItem) => {
            const isMenuExpanded = expandedMenu === menuItem.label;

            return (
              <div key={menuItem.id}>
                <button className={`w-full px-6 text-left pt-3 pb-2 items-center leading-6`} onClick={() => handleToggle(menuItem.label)}>
                  <p className={`text-base ${paths[0] == menuItem.label.toLowerCase() ? 'font-medium text-blue-950' : 'font-normal text-blue-950/20'}`}>{menuItem.label}</p>
                </button>
                {isMenuExpanded && (
                  <div className='mx-3 py-2'>
                    {menuItem.subMenu?.map((subMenuItem) => {
                      const IconComponent = Heroicons[subMenuItem.icon];
                      return (
                        <Link key={subMenuItem.id} href={`/${subMenuItem.link}`} className="flex flex-row items-center px-6 space-x-2 cursor-pointer" >
                          <div className={`${paths[1] === subMenuItem.label.toLowerCase() ? 'scale-110 text-blue-500' : 'font-normal text-blue-950/40'}`}><IconComponent height={18} width={18} className={`${paths[1] === subMenuItem.label.toLowerCase() ? 'scale-110 text-blue-500' : 'font-normal text-blue-950/40'}`} /></div>
                          <div className={`text-sm pt-3 pb-2 ${paths[1] === subMenuItem.label.toLowerCase() ? 'font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500' : 'font-normal text-blue-950/40'}`}>{subMenuItem.label}</div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebar;

