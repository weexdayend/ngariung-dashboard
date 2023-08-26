import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

type Props = {}

function RegisterForm({}: Props) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [register, setRegister] = useState(false)

  const router = useRouter()

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setFullNameError('');
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    setPhoneNumberError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName) {
      setFullNameError('Please enter your email.');
      return;
    }

    if (!phoneNumber) {
      setPhoneNumberError('Please enter your email.');
      return;
    }

    if (!email) {
      setEmailError('Please enter your email.');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    try{
      const responsePromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${process.env.API_URL}register`, { fullName, phoneNumber, email, password });
          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      });

      await toast.promise(
        responsePromise, // Resolve with the response data
        {
          loading: 'Checking your data...',
          success: (response: any) => {
            setRegister(true)
            router.replace('/auth', undefined, { shallow: false });
            return response.message;
          },
          error: (e: any) => {
            return e.response?.data?.error
          },
        }
      );
    } catch (error: any) {
      console.log(error.response.data.error);
    }
  };

  return (
    <React.Fragment>
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="h-14 w-auto"
          src="/assets/sales-tracker-logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Start with SakaPulse now!
        </h2>
        <p className="text-left text-sm text-gray-500">
          <span className="font-semibold leading-6 text-indigo-500 hover:text-indigo-500">
          SakaPulse
          </span>
          {' '}can help your business grow and easily manage your business.
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {
          register ? (
            <div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="fullname" className="block text-sm font-medium leading-6 text-gray-900">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={handleFullNameChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {fullNameError && <p className="text-red-500 text-sm mt-1">{fullNameError}</p>}
                </div>
              </div>
    
              <div>
                <label htmlFor="phonenumber" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
                </div>
              </div>
    
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
              </div>
    
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
              </div>
    
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          )
        }
      </div>
    </React.Fragment>
  )
}

export default RegisterForm