import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableClass from './table_schedule'

import axios from 'axios'
import cookie from 'cookie'

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean
  error: any
  eventData: any
  fitnessData: any
  outletData: any
  eventCategoryData: any
  eventTypeData: any
}

function Index({ error, eventData, fitnessData, outletData, eventCategoryData, eventTypeData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(fitnessData)

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
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <TableClass 
        onUpdated={() => setUpdated(true)} 
        eventData={eventData}
        fitnessData={datas} 
        outletData={outletData} 
        eventCategoryData={eventCategoryData}
        eventTypeData={eventTypeData}
      />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const fetchEvent = async () => {
      const responseEvent = await axios.get(`${process.env.API_URL}schedule/getName`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const fitnessData = await responseEvent.data;

      return fitnessData
    }

    const fetchFitness = async () => {
      const responseFitness = await axios.get(`${process.env.API_URL}schedule/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const fitnessData = await responseFitness.data;

      return fitnessData
    }
    
    const fetchOutlet = async () => {
      const responseOutlet = await axios.get(`${process.env.API_URL}outlet/collective`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const outletData = await responseOutlet.data;

      return outletData
    }

    const fetchEventCategory = async () => {
      const responseEventCategory = await axios.get(`${process.env.API_URL}event-category/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const eventCategoryData = await responseEventCategory.data;

      return eventCategoryData
    }

    const fetchEventType = async () => {
      const responseEventType = await axios.get(`${process.env.API_URL}event-type/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        },
      });
      const eventTypeData = await responseEventType.data;

      return eventTypeData
    }

    return Promise.all([
      fetchEvent(),
      fetchFitness(),
      fetchOutlet(),
      fetchEventCategory(),
      fetchEventType(),
    ]).then(([eventData, fitnessData, outletData, eventCategoryData, eventTypeData]) => {
      return {
        props: {
          eventData,
          fitnessData,
          outletData,
          eventCategoryData,
          eventTypeData,
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
