import React from 'react'

type Props = {}

function Footer({}: Props) {
  return (
    <footer>
      {/* Powered By */}
      <div className='flex flex-col justify-center text-center items-center py-5 px-6 mt-20 border-t border-gray-100'>
        <div className='flex flex-row items-center'>
          <p className='text-xs text-blue-950/20'>Powered By</p>
          <h1 className='text-base text-blue-950/30 font-extrabold'>SAKA GROUP</h1>
        </div>
        <p className='text-xs text-blue-950/20'>Copyrights 2023 All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer