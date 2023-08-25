import React, { useEffect, useState, Fragment } from 'react'

import {
  BellIcon,
  InformationCircleIcon,
} 
from '@heroicons/react/outline'

import { useSelector } from 'react-redux'
import { selectedMenu } from '@/utils/menuReducers'
import { selectedSubMenu } from '@/utils/menuReducers'

import { Popover, Transition } from '@headlessui/react'

import axios from 'axios'
import { useRouter } from 'next/router'

interface Profile {
  name: string;
  email: string;
}

function HeadBar() {
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [businessName, setBusinessName] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${process.env.APIURL}/profile`);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`${process.env.APIURL}/business/get`);
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
    fetchProfileData();
  }, []);

  const solutions = [
    {
      name: profileData?.name,
      description: profileData?.email,
      href: '##',
    },
  ]

  const nameParts = profileData?.name?.split(' ') ?? [];
  const initials = (nameParts[0]?.charAt(0) ?? '') + (nameParts[1]?.charAt(0) ?? '');

  function handleLogout() {
    // Call the logout API route
    axios.post(`${process.env.APIURL}/logout`)
      .then(() => {
        // Redirect the user to the login page or any other appropriate page
        router.replace('/auth');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  const handleRoute = () => {    
    router.push('settings/business')
  }

  return (
    <nav className="z-50 bg-opacity-10 backdrop-filter backdrop-blur-xl sticky top-0 rounded-b-3xl">
      <div className="backdrop-blur-md bg-white/10 px-1 py-4 rounded-b-3xl">
        <div className="flex items-center justify-between mx-auto px-4">
          <div className='w-full col-span-2 ml-4'>
          {
            businessName != null ? (
            <div className="text-blue-950 font-bold text-4xl">{businessName}</div>
            ) : (
            <div onClick={() => handleRoute()} className="text-blue-950 font-bold text-4xl">No Business yet</div>
            )
          }
          </div>
          <div className="xs:hidden sm:hidden md:hidden lg:flex xl:flex flex-row items-center px-3 py-2 rounded-full space-x-3">
            <BellIcon height={24} width={24} className="text-blue-9500 cursor-pointer" />
            <InformationCircleIcon height={24} width={24} className="text-blue-950 cursor-pointer" />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                      ${open ? '' : 'text-opacity-90'}
                      group inline-flex items-center px-6 py-2 bg-blue-950 rounded-full text-white cursor-pointer text-sm`}
                  >
                    <span>{initials ? initials : '...'}</span>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute right-0 z-50 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-sm">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 bg-white p-7 lg:grid-cols-1">
                          {solutions.map((item, index) => (
                            <a
                              key={index}
                              href={item.href}
                              className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                            >
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {item.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>
                        <div className="bg-gray-50 p-4">
                          <a
                            onClick={() => handleLogout()}
                            className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                          >
                            <span className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">
                                Logout
                              </span>
                            </span>
                            <span className="block text-sm text-gray-500">
                              Logged out your account from SakaPulse?
                            </span>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HeadBar