import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableEventType from './table_event_type';

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean;
  error: any
  eventTypeData: any;
}

function Index({ error, eventTypeData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(eventTypeData)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}event/type/get`);
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

  console.log(eventTypeData)

  return (
    <Layout>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <TableEventType eventTypeData={datas} onUpdated={() => setUpdated(true)} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const response = await axios.get(`${process.env.API_URL}event/type/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      },
    });
    const eventTypeData = await response.data;

    return {
      props: {
        eventTypeData,
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