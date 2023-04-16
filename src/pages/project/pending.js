import Head from 'next/head'
import { Inter } from '@next/font/google'
import Overview from '@/components/project/overview'
import List from '@/components/project/list'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Pending({ error, list }) {
  const router = useRouter()
  if (error) {
    return (
      <>
        <Head>
          <title>Pending Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div className='flex space-x-12'>
            <Overview />
            <div className='pt-10 w-[90%] text-center text-gray-500'>
              {error}
            </div>
          </div>
        </main>
      </>
    )
  }

  const column = React.useMemo(
    () => [
      {
        Header: 'Project',
        accessor: 'project'
      },
      {
        Header: 'Role',
        accessor: 'role'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Action',
        accessor: 'action'
      }
    ],
    []
  )

  const data = React.useMemo(
    () => {
      const data = []
      list.map((item) => {
        data.push({
          id: item.project_id,
          project: item.project_name,
          role: item.role,
          status: 'Pending'
        })
      })
      return data
    },
    []
  )

  return (
    <>
      <Head>
        <title>Pending Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className='flex space-x-12'>
          <Overview />
          <List columns={column} data={data} />
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie?.split('token=')[1];

  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }
  try {
    const data = {
      project_name: '',
      role: '',
    }
    const list = await axios.post(`https://api.projectmana.online//api/user/invitations/list`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        list: list.data.data
      }
    }
  } catch (error) {
    console.log(error.response.data.message);
    return {
      props: {
        error: error.response.data.message,
      },
    }
  }
}
