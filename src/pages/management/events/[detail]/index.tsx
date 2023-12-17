import React, { useEffect, useState } from 'react'
import Layout from '@/app/layout'

import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

import axios from 'axios'

import withAuth from '@/pages';
import Body from './body';

type Props = {
  isLoggedIn: boolean;
  error: any
}

function Index({ error }: Props) {
  const [updated, setUpdated] = useState(false)

  const [events, setEvents] = useState([])
  const [stages, setStages] = useState([])
  const [trivia, setTrivia] = useState([])

  const router = useRouter()
  const { detail } = router.query

  const fetchDataEvent = async () => {
    const response = await axios.get(`${process.env.API_URL}event/${detail}/detail`);
    const res = await response.data;
    setEvents(res.data)
  }

  const fetchDataStages = async () => {
    const response = await axios.get(`${process.env.API_URL}event/${detail}/stage`)
    const res = await response.data
    setStages(res.data)
  }
  
  const fetchDataTrivia = async () => {
    const response = await axios.get(`${process.env.API_URL}event/${detail}/trivia`)
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
          />)
      }
    </Layout>
  )
}

export default withAuth(Index)