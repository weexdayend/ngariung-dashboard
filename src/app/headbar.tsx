import React, { Fragment } from 'react'

import {
  BellIcon,
  InformationCircleIcon,
} 
from '@heroicons/react/outline'

import axios from 'axios'

import { Popover, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';

interface Profile {
  name: string;
  email: string;
}

function HeadBar() {
  const router = useRouter()

  function handleLogout() {
    // Call the logout API route
    axios.post(`api/logout`)
      .then(() => {
        // Redirect the user to the login page or any other appropriate page
        router.replace('/auth');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  return (
    <nav className="z-50 bg-opacity-10 backdrop-filter backdrop-blur-xl sticky top-0 rounded-b-3xl">
      <div className="backdrop-blur-md bg-white/10 px-1 py-4 rounded-b-3xl">
        <div className="flex items-center justify-between mx-auto px-4">
          <div className='w-full col-span-2 ml-4'>
            <div className="text-blue-950 font-bold text-4xl">Sakapulse</div>
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
                    <span>SG</span>
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