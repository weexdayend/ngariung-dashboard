import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'

import axios from 'axios'
import cookie from 'cookie'

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import withAuth from '@/pages';
import Body from './body'

type Props = {
  isLoggedIn: boolean
  error: any
  scheduleData: any
}

function Index({ error, scheduleData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(scheduleData)

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
      <Body data={datas}  />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const fetchSchedule = async () => {
      const responseSchedule = await axios.get(`${process.env.API_URL}schedule/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const scheduleData = await responseSchedule.data;

      return scheduleData
    }

    return Promise.all([
      fetchSchedule()
    ]).then(([scheduleData]) => {
      return {
        props: {
          scheduleData,
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