import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableRoom from './table_room';

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean;
  error: any
  roomData: any;
  popoverData: any;
}

function Index({ error, roomData, popoverData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(roomData)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}room/get`);
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
      <TableRoom roomData={datas} onUpdated={() => setUpdated(true)} popoverData={popoverData} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const response = await axios.get(`${process.env.API_URL}room/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      },
    });
    const roomData = await response.data;

    const popover = await axios.get(`${process.env.API_URL}outlet/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      }
    });
    const popoverData = await popover.data;
    const transformedData = popoverData.data.map((item: any) => {
      return {
        id: item._id,
        name: item.outletName,
      };
    });

    return {
      props: {
        roomData,
        popoverData: transformedData,
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