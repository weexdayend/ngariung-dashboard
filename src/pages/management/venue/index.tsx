import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableVenue from './table_venue';

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean;
  error: any
  venueData: any;
}

function Index({ error, venueData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(venueData)

  console.log(venueData)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}venue/get`);
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
      <TableVenue venueData={datas} onUpdated={() => setUpdated(true)} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const response = await axios.get(`${process.env.API_URL}venue/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      },
    });
    const venueData = await response.data;

    return {
      props: {
        venueData,
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