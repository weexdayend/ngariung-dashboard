import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableEmployee from './table_employee'

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean
  error: any
  popoverData: any
  data: any
}

function Index({ error, popoverData, data }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(data)

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}employee/get`);
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
      <TableEmployee data={datas} onUpdated={() => setUpdated(true)} popoverData={popoverData} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const response = await axios.get(`${process.env.API_URL}employee/get`, {
      headers: {
        Cookie: `token=${cookies['token']}`
      }
    });
    const data = await response.data;
  
    const popover = await axios.get(`${process.env.API_URL}outlet/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
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
        popoverData: transformedData,
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