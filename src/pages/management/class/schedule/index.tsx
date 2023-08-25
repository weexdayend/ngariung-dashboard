import React, { useEffect, useState } from 'react'
import Layout from '../../../../app/layout'
import TableClass from './table_schedule'

import axios from 'axios'
import { GetServerSideProps } from 'next';
import cookie from 'cookie'

type Props = {
  error: any
  token: any
  fitnessData: any
  outletData: any
}

function Index({ error, token, fitnessData, outletData }: Props) {

  console.log(error)

  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(fitnessData)

  const fetchNewData = async () => {
    const response = await axios.get('https://dashboard-sakapulse.vercel.app/api/class/get', {
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
      <TableClass token={token} onUpdated={() => setUpdated(true)} fitnessData={datas} outletData={outletData} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
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
  
    const responseFitness = await axios.get('https://dashboard-sakapulse.vercel.app/api/class/get', {
      headers: {
        Authorization: `${cookies['token']}`
      },
    });
    const fitnessData = await responseFitness.data;
  
    const responseOutlet = await axios.get('https://dashboard-sakapulse.vercel.app/api/outlet/byline?line=Fitness', {
      headers: {
        Authorization: `${cookies['token']}`
      },
    });
    const outletData = await responseOutlet.data;
  
    return {
      props: {
        token: cookies['token'],
        fitnessData,
        outletData,
      },
    }; 
  } catch (error: any) {
    return {
      props: {
        error: error
      }
    }
  }
}

export default Index
