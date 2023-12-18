import React from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { HomeIcon } from '@heroicons/react/solid'

type Props = {}

function BreadCrumbs({}: Props) {

  function capitalizeFirstLetterOfEachWord(inputString: any) {
    return inputString.replace(/\b\w/g, (match: any) => match.toUpperCase());
  }

  const router = useRouter();
  const paths = router.asPath.split('/').filter((path) => path !== '');

  const formattedPaths = paths.map((path) => capitalizeFirstLetterOfEachWord(path.replace(/-/g, ' ')));

  return (
    <div className="bg-white w-fit px-6 py-2 rounded-xl mb-6">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link href="/dashboard">
            <HomeIcon className="w-4 h4 text-gray-400" />
          </Link>
        </li>
        {formattedPaths.map((path: any, index: any) => {
          return (
            <li className="flex items-center" key={index}>
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <p className="text-indigo-500 hover:underline">{path}</p>
            </li>
          );
        })}
      </ol>
    </div>
  )
}

export default BreadCrumbs