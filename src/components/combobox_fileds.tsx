import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronDownIcon, CheckIcon } from '@heroicons/react/outline';

interface DropDownList {
  id: string | '';
  name: string | '';
  phone: string | '';
}

interface Person {
  id: string;
  name: string;
  phone: string;
}

interface OutletLineComboboxProps {
  label: string;
  holder: string;
  value: DropDownList;
  onChange: (value: DropDownList) => void;
  options: Person[];
}

const ComboboxDropdown: React.FC<OutletLineComboboxProps> = ({ label, value, onChange, options }) => {
  const [query, setQuery] = useState('');

  const filteredPeople: Person[] =
    query === ''
      ? options
      : options.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={value} onChange={onChange}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Combobox.Label>
      <div className="relative mt-1">
        <div className="relative w-full cursor-default rounded-md bg-white py-1 px-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
          <Combobox.Input
            className="w-full border-none py-2 text-sm leading-5 text-gray-900"
            displayValue={(person: Person) => person.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm">
            {filteredPeople.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                {query.length > 0 && (
                  <Combobox.Option value={{ id: null, name: query, phone: null }}>
                    Add new data? "{query}"
                  </Combobox.Option>
                )}
              </div>
            ) : (
              filteredPeople.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default ComboboxDropdown;
