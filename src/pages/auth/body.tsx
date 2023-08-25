import React, { useState } from 'react'

import Footer from '@/app/footer'
import LoginForm from './login-form'
import RegisterForm from './register-form'
import Image from 'next/image'

type Props = {}

function Body({}: Props) {
  const [form, setForm] = useState('login')

  return (
    <div className="grid min-h-screen sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
      <div className="flex flex-col justify-center items-center sm:pt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          {
            form === 'login' && (<LoginForm />)
          }
          {
            form === 'register' && (<RegisterForm />)
          }

          <div className="mt-4">
          {
            form == 'login' ? (
              <p className="text-sm leading-6">
                Don't have a SakaPulse account? <span onClick={() => setForm('register')} className="text-indigo-600 font-bold cursor-pointer hover:text-indigo-500">Sign up</span>
              </p>
            ) : (
              <p className="text-sm leading-6">
                Already have a SakaPulse account? <span onClick={() => setForm('login')} className="text-indigo-600 font-bold cursor-pointer hover:text-indigo-500">Login</span>
              </p>
            )
          }
        </div>

        <Footer />
      </div>
      <div className="relative w-full h-full hidden sm:hidden md:hidden lg:block xl:block">
        <div className="absolute z-50 inset-0 w-full h-full bg-gradient-to-b from-indigo-500/40 to-purple-500/50"></div>
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="/assets/pexel-bg-login.jpg"
          alt="SAKA GROUP"
        />
      </div>
    </div>
  )
}

export default Body