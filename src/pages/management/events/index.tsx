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
  dataTypes: any
  dataCategories: any
}

function Index({ error, dataEvent, dataTypes, dataCategories }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(dataEvent)

  const fetchNewData = async () => {
    const response = await axios.get(`/api/event/get`);
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
        datas && (<TableEvents dataEvent={datas} dataTypes={dataTypes} dataCategories={dataCategories} onUpdated={() => setUpdated(true)} />)
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const fetchEvent = async () => {
      const response = await axios.get(`http://localhost:3000/api/event/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const data = await response.data;
      return data
    }

    const fetchTypes = async () => {
      const response = await axios.get(`http://localhost:3000/api/event-type/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const data = await response.data;
      return data
    }

    const fetchCategories = async () => {
      const response = await axios.get(`http://localhost:3000/api/event-category/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const data = await response.data;
      return data
    }

    return Promise.all([
      fetchEvent(),
      fetchTypes(),
      fetchCategories()
    ]).then(([dataEvent, dataTypes, dataCategories]) => {
      return {
        props: {
          dataEvent,
          dataTypes,
          dataCategories
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