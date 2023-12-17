import React, { useEffect, useState } from 'react'
import Layout from '@/app/layout'

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import TableEvents from './table_events';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean;
  error: any
  dataEvent: any
  dataType: any
  dataCategory: any
}

function Index({ error, dataEvent, dataType, dataCategory }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(dataEvent)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}event/get`);
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
      {
        datas && (<TableEvents dataEvent={datas} dataType={dataType} dataCategory={dataCategory} onUpdated={() => setUpdated(true)} />)
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const fetchEvent = async () => {
      const response = await axios.get(`${process.env.API_URL}event/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const data = await response.data;
      return data
    }

    const fetchType = async () => {
      const response = await axios.get(`${process.env.API_URL}event/type/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const data = await response.data;
      return data
    }

    const fetchCategory = async () => {
      const response = await axios.get(`${process.env.API_URL}event/category/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const data = await response.data;
      return data
    }

    return Promise.all([
      fetchEvent(),
      fetchType(),
      fetchCategory()
    ]).then(([dataEvent, dataType, dataCategory]) => {
      return {
        props: {
          dataEvent,
          dataType,
          dataCategory
        }
      }
    })
  } catch (error: any) {
    return {
      props: {
        error: `${error.message}`, // Serialize the error message, not the whole error object
      },
    };
  }
}

export default withAuth(Index)