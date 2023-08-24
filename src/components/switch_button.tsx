import React from 'react';
import { Switch } from '@headlessui/react'

interface SwitchFieldProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const SwitchButton: React.FC<SwitchFieldProps> = ({ label, enabled, onChange }) => {
  return (
    <div className="sm:col-span-full flex flex-row items-center space-x-4">
      <label className="block text-sm font-medium leading-6 text-gray-900">{label}</label>
      <Switch
        checked={enabled}
        onChange={() => onChange(!enabled)}
        className={`${enabled ? 'bg-green-600' : 'bg-rose-600'}
          relative inline-flex h-[20px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Outlet setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[16px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </div>
  );
};

export default SwitchButton;
