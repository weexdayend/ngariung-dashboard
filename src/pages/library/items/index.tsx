import React, { useEffect, useState } from 'react'
import Layout from '../../../app/layout'
import TableItems from './table_items';

import { GetServerSideProps } from 'next';
import { Toaster, toast } from 'react-hot-toast';

import axios from 'axios'
import cookie from 'cookie'

import withAuth from '@/pages';

type Props = {
  isLoggedIn: boolean
  error: any
  productData: any
  categoryData: any
}

function Index({ error, productData, categoryData }: Props) {
  const [updated, setUpdated] = useState(false)
  const [datas, setDatas] = useState(productData)
  const [filter, setFilter] = useState<any>([])

  const fetchNewData = async () => {
    const response = await axios.get(`${process.env.API_URL}products/get`);
    const res = await response.data;
    setDatas(res)
  }

  useEffect(() => {
    if(updated){
      fetchNewData()
      setUpdated(false)
    }
  }, [updated])

  useEffect(() => {
    if (datas && Array.isArray(datas.data)) {
      const uniqueCategoryNames = new Set();
      const uniqueCategories: any[] = [];
    
      datas.data.forEach((item: any, index: any) => {
        const categoryName = item.categoryName;
        if (!uniqueCategoryNames.has(categoryName)) {
          uniqueCategoryNames.add(categoryName);
          uniqueCategories.push({ id: index, uniqueName: categoryName });
        }
      });
    
      setFilter(uniqueCategories)
    } else {
      console.error("datas.data is not an array");
    }
  }, [datas])

  if (error) {
    toast.error(error)
  }

  return (
    <Layout>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <TableItems data={datas} filter={filter} category={categoryData} onUpdated={() => setUpdated(true)} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try{
    const cookies = cookie.parse(context.req.headers.cookie || '');

    const fetchProducts = async () => {
      const response = await axios.get(`${process.env.API_URL}products/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        }
      });
      const data = await response.data;

      return data
    }

    const fetchCategory = async () => {
      const response = await axios.get(`${process.env.API_URL}product-categories/get`, {
        headers: {
          Cookie: `token=${cookies['token']}`
        }
      });
      const data = await response.data;

      return data
    }

    return Promise.all([
      fetchProducts(),
      fetchCategory(),
    ]).then(([productData, categoryData]) => {
      return {
        props: {
          productData,
          categoryData,
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