import React, { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/outline';

interface DropDownList {
  id: string | '';
  name: string | '';
  phone?: string | '';
}

interface OutletLineDropdownProps {
  label: string;
  holder: string;
  value: DropDownList;
  onChange: (value: DropDownList) => void;
  options: { id: string; name: string }[];
}

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const ListDropdown: React.FC<OutletLineDropdownProps> = ({ label, holder, value, onChange, options }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
      <>
        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>
        <div className="relative mt-2">
          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white px-4 py-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span className="flex items-center">
              <span className="block truncate">{value.name ? value.name : holder}</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((type) => (
                <Listbox.Option
                  key={type.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={type}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                        >
                          {type.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-indigo-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
    </Listbox>
  );
};

export default ListDropdown;