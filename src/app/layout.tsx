import React from 'react';
import { Provider } from 'react-redux';
import './globals.css'

import Head from 'next/head';
import Sidebar from './sidebar';
import HeadBar from './headbar';

import './styles.css'; // main style file
import './default.css'; // theme css file
import './react-big-calendar.css'

import { store } from '@/utils/store';

import Router from 'next/router';
import NProgress from 'nprogress'; // Import nprogress styles as well

import './nprogress.css'; // Import nprogress styles
import BreadCrumbs from '@/components/breadcrumbs';

import { Analytics } from '@vercel/analytics/react';

// Binding events to show and hide the loading progress bar
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function RootLayout({children,}: {children: React.ReactNode}) {

  return (
    <Provider store={store}>
      <Head>
        {/* Set the page title */}
        <title>Sales Tracker</title>

        {/* Set the favicon */}
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>

      
      <div className="bg-gray-50">
        <div className="flex min-h-screen">
          <Sidebar />

          <div className="bg-gray-50 z-50 w-full p-4">
            <HeadBar />

            {/* Page content goes here */}
            <main className="mt-4">
              <BreadCrumbs />
              {children}
              <Analytics />
            </main>
            
            <footer>
              {/* Powered By */}
              <div className='flex justify-center text-center items-center py-5 px-6 mt-20 border-t border-gray-100'>
                <p className='text-xs text-blue-950/20'>Powered By&nbsp;</p>
                <h1 className='text-base text-blue-950/30 font-extrabold'>SAKA GROUP&nbsp;</h1>
                <p className='text-xs text-blue-950/20'>Copyrights &#169; 2023 All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Provider>
  )
}
