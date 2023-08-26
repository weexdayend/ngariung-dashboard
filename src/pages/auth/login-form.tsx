import React, { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

type Props = {}

// Create a custom type for the error response
interface ErrorResponse {
  error: string;
}

function LoginForm({}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter()

  const [error, setError] = useState<string>('');

  const [openModal, setOpenModal] = useState(false)
  function closeModal() {
    setOpenModal(false)
  }

  const SuccessToast = ({ message }: any) => (
    <div className="bg-gradient-to-r from-indigo-500 to-rose-400 p-4 rounded-md shadow-lg text-white">
      {message}
    </div>
  );

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

    if (!email) {
      setEmailError('Please enter your email.');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password.');
      return;
    }

    try {
      const responsePromise = new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(`${process.env.API_URL}login`, { email, password })
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
            router.push('/dashboard', undefined, { shallow: false })
            return response.message;
          },
          error: (e: any) => {
            return e.response?.data?.error
          },
        }
      );
    } catch (error) {
      console.error('Login error:', error);

      const responseError = error as AxiosError<ErrorResponse>; // Use custom type here

      if (responseError.response?.data?.error) {
        setError('Oops! It seems your email or password is dancing to a different tune. Please check and try again.');
        setOpenModal(true)
      } else {
        setError('An error occurred while logging in.');
        setOpenModal(true)
      }
    }
  };

  const ModalComponent = () => {
    return(
      <Transition appear show={openModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full z-50 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Something went wrong!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      {error}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-rose-100 px-4 py-2 text-sm font-medium text-rose-900 hover:bg-rose-200 focus:outline-none"
                      onClick={closeModal}
                    >
                      Try again
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }

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
      <ModalComponent />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="h-14 w-auto"
          src="/assets/sales-tracker-logo.png"
          alt="Your Company"
          width={100}
          height={100}
        />
        <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <p className="text-left text-sm text-gray-500">
          Not a member?{' '}
          <a href="#" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-500">
            Start a 14 day free trial
          </a>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
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
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
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
      </div>
    </React.Fragment>
  )
}

export default LoginForm