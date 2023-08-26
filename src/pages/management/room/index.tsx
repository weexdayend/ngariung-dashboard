import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableRoom from './table_room';

import axios from 'axios'
import { GetServerSideProps } from 'next';
import cookie from 'cookie'

type Props = {
  token: any;
  roomData: any;
  popoverData: any;
}

function Index({ token, roomData, popoverData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(roomData)

  const fetchNewData = async () => {
    const response = await axios.get(`https://dashboard-sakapulse.vercel.app/api/room/get`, {
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
      <TableRoom token={token} roomData={datas} onUpdated={() => setUpdated(true)} popoverData={popoverData} />
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

    const response = await axios.get(`${process.env.API_URL}room/get`, {
      headers: {
        Authorization: `${cookies['token']}`
      },
    });
    const roomData = await response.data;

    const popover = await axios.get(`${process.env.API_URL}outlet/get`, {
      headers: {
        Authorization: `${cookies['token']}`
      }
    });
    const popoverData = await popover.data;
    const transformedData = popoverData.data.map((item: any) => {
      return {
        id: item._id, // Replace this with the actual ID field in the response
        name: item.outletName, // Replace this with the actual field name for outlet name
      };
    });

    return {
      props: {
        token: cookies['token'],
        roomData,
        popoverData: transformedData,
      },
    };
  } catch(error: any) {
    return {
      props: {
        error: error
      }
    }
  }
}

export default Index