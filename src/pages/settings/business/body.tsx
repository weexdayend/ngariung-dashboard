import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Toaster, toast } from 'react-hot-toast';

type Props = {};

function Body({}: Props) {
  const [businessName, setBusinessName] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');

  const [newData, setNewData] = useState(true)

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessName(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessPhone(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessEmail(e.target.value);
  };

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const response = await axios.get(`${process.env.APIURL}/business/get`);
        const businessData = response.data;

        if (response.status === 200) {
          if (businessData.businessName == null) {
            setNewData(true)
          } else {
            setNewData(false)

            // Data exists, update state
            setBusinessName(businessData.businessName);
            setBusinessPhone(businessData.businessPhone);
            setBusinessEmail(businessData.businessEmail);
          }
        }
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = newData ? `https://dashboard-sakapulse.vercel.app/api/business/register` : `https://dashboard-sakapulse.vercel.app/api/business/update`;
    const response = await toast.promise(
      axios.post(endpoint, { businessName, businessPhone, businessEmail }),
      {
        loading: 'Saving...',
        success: newData ? 'Business registered successfully' : 'Business updated successfully',
        error: (error) => {
          console.error('Operation error:', error);
          return 'An error occurred';
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log(businessName ? 'Business registered successfully' : 'Business updated successfully');
    } else {
      const data = response.data;
      console.error('Operation error:', data.error);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-3xl shadow-xl shadow-gray-100">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(90deg, #4f46e5 0%, #fb7185 100%)', // Green gradient
              color: '#fff'
            },
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Business Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Business Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="businessname"
                    id="businessname"
                    required
                    value={businessName}
                    onChange={handleBusinessNameChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Business Phone
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="businessphone"
                    id="businessphone"
                    required
                    value={businessPhone}
                    onChange={handlePhoneNumberChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Business Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={businessEmail}
                    onChange={handleEmailChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Body;
