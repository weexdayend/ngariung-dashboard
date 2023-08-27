import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableClass from './table_schedule'

import axios from 'axios'
import cookie from 'cookie'

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean
  error: any
  fitnessData: any
  outletData: any
}

function Index({ error, fitnessData, outletData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(fitnessData)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}schedule/get`);
    const res = await response.data;
    setDatas(res)
  }

  useEffect(() => {
    if(updated){
      fetchNewData()
      setUpdated(false)
    }
  }, [updated])

  if (error) {
    toast.error(error)
  }

  return (
    <Layout>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <TableClass onUpdated={() => setUpdated(true)} fitnessData={datas} outletData={outletData} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const responseFitness = await axios.get(`${process.env.API_URL}schedule/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      },
    });
    const fitnessData = await responseFitness.data;
  
    const responseOutlet = await axios.get(`${process.env.API_URL}outlet/getWithRoomEmployee`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      },
    });
    const outletData = await responseOutlet.data;
  
    return {
      props: {
        fitnessData,
        outletData,
      },
    };
  } catch (error: any) {
    return {
      props: {
        error: `${error.message}`, // Serialize the error message, not the whole error object
      },
    };
  }
}

export default withAuth(Index)
