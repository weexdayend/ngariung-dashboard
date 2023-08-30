import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'

import { Toaster, toast } from 'react-hot-toast';

import withAuth from '@/pages';

type Props = {}

const datas = [
  {
    id: 1,
    eventCategory: 'Kelas Senam',
    totalEvent: 10,
    totalBooked: 100,
    totalEarnings: 1500000
  },
  {
    id: 2,
    eventCategory: 'Studio Photo',
    totalEvent: 10,
    totalBooked: 100,
    totalEarnings: 5000000
  },
  {
    id: 3,
    eventCategory: 'Gathering',
    totalEvent: 10,
    totalBooked: 100,
    totalEarnings: 3000000
  },
  {
    id: 4,
    eventCategory: 'Festival',
    totalEvent: 10,
    totalBooked: 100,
    totalEarnings: 14214099
  },
]

function Index({}: Props) {
  return (
    <Layout>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <div className="grid grid-cols-3 gap-8">
        <h1>Report goes here</h1>
      </div>
    </Layout>
  )
}

export default withAuth(Index)