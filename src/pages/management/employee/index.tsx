import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableEmployee from './table_employee'
import axios from 'axios'
import { GetServerSideProps } from 'next';
import cookie from 'cookie'

type Props = {
  token: any;
  popoverData: any;
  data: any;
}

function EmployeeManagement({ token, popoverData, data }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(data)

  const fetchNewData = async () => {
    const response = await axios.get('http://localhost:3000/api/employee/get', {
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
      <TableEmployee data={datas} onUpdated={() => setUpdated(true)} popoverData={popoverData} />
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

  const response = await axios.get('http://localhost:3000/api/employee/get', {
    headers: {
      Authorization: `${cookies['token']}`
    }
  });
  const data = await response.data;

  const popover = await axios.get('http://localhost:3000/api/outlet/get', {
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
      token: `${cookies['token']}`,
      popoverData: transformedData,
      data,
    },
  };
}

export default EmployeeManagement