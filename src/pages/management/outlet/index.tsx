import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableOutlet from './table_outlet'
import axios from 'axios'
import { GetServerSideProps } from 'next';
import cookie from 'cookie'

type Props = {
  token: any;
  data: any;
}

function OutletManagement({ token, data }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(data)

  const fetchNewData = async () => {
    const response = await axios.get('http://localhost:3000/api/outlet/get', {
        headers: {
          Authorization: `${token}`
        }
      });
    const res = await response.data;
    setDatas(res)
  }

  useEffect(() => {
    if(updated){
      fetchNewData()
      setUpdated(false)
    }
  }, [updated])

  return (
    <Layout>
      <TableOutlet data={datas} onUpdated={() => setUpdated(true)} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  
  // Check if the user is authenticated using the cookies
  const isAuthenticated = !!cookies['token'] && !!cookies['refreshToken'];

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/auth', // Redirect to login if not authenticated
        permanent: false,
      },
    }
  }

  const response = await axios.get('http://localhost:3000/api/outlet/get', {
    headers: {
      Authorization: `${cookies['token']}`
    }
  });
  const data = await response.data;

  return {
    props: {
      token: cookies['token'],
      data,
    },
  };
}

export default OutletManagement