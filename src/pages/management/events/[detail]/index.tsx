import React, { useEffect, useState } from 'react'
import Layout from '@/app/layout'

import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import axios from 'axios'

import withAuth from '@/pages';
import Body from './body';
import { GetServerSideProps } from 'next';

type Props = {
  isLoggedIn: boolean;
  error: any;
  stageListUser: any;
}

function Index({ error, stageListUser }: Props) {
  const [updated, setUpdated] = useState(false)

  const [events, setEvents] = useState([])
  const [stages, setStages] = useState([])
  const [trivia, setTrivia] = useState([])

  const router = useRouter()
  const { detail } = router.query

  const fetchDataEvent = async () => {
    const response = await axios.get(`/api/event/${detail}/detail`);
    const res = await response.data;
    setEvents(res.data)
  }

  const fetchDataStages = async () => {
    const response = await axios.get(`/api/event/${detail}/stage`)
    const res = await response.data
    setStages(res.data)
  }
  
  const fetchDataTrivia = async () => {
    const response = await axios.get(`/api/event/${detail}/trivia`)
    const res = await response.data
    setTrivia(res.data)
  }

  useEffect(() => {
    fetchDataEvent()
    fetchDataStages()
    fetchDataTrivia()
  }, [])

  useEffect(() => {
    if(updated){
      fetchDataEvent()
      fetchDataStages()
      fetchDataTrivia()
      
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
        toastOptions={{
          success: {
            style: {
              background: 'linear-gradient(90deg, #4f46e5 0%, #fb7185 100%)', // Green gradient
              color: '#fff'
            },
          },
        }}
      />
      {
        events.length > 0 && (
          <Body 
            onUpdated={() => setUpdated(true)} 
            EventID={detail} 
            dataEvent={events} 
            dataStage={stages} 
            dataTrivia={trivia}
            stageList={stageListUser}
          />)
      }
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query } = context;
    const { detail } = query;

    const fetchListUser = async () => {
      const endpoint = `http://localhost:3000/api/users/get-users`;
      const body: any = {
        EventID: detail
      };
  
      try {
        const hit = await axios.post(endpoint, body);
        const response = hit.data;
  
        return response.result;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
      }
    };

    const [stageListUser] = await Promise.all([
      fetchListUser(),
    ]);

    return {
      props: {
        stageListUser,
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