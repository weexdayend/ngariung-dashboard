import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableOutlet from './table_outlet'

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: any
  error: any
  data: any
}

function Index({ error, data }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(data)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}outlet/get`);
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
      <TableOutlet data={datas} onUpdated={() => setUpdated(true)} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try{
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const response = await axios.get(`${process.env.API_URL}outlet/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      }
    });
    const data = await response.data;

    return {
      props: {
        data,
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