import Head from 'next/head'
import Overview from '@/components/project/Overview'
import List from '@/components/project/List'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getProjectList, getUserByEmail } from '@/util/mics'
import { BsListUl } from 'react-icons/bs'

export default function Upcoming({ error, list }) {
  const router = useRouter()

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
        Header: 'Progress',
        accessor: 'progress'
      }
    ],
    []
  )

  const data = React.useMemo(
    () => {
      const data = []
      if(!error) {
        list.map((item) => {
          data.push({
            id: item.id,
            project: item.name,
            role: item.user.role,
            status: 'Processing',
            progress: item.progress
          })
        })
        return data
      }
    },
    []
  )

  if (error) {
    return (
      <>
        <Head>
          <title>Upcoming Project</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div className='flex space-x-12'>
            <Overview />
            <div className='w-[90%] pl-44 -mt-4'>
              <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
                <div className='flex items-center'>
                  <BsListUl className='mr-3' />
                  Upcoming Projects
                </div>
                <hr className=' w-80' />
              </div>
              <div className='pt-10 w-[90%] text-center text-gray-500'>
                {error}
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Upcoming Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={`flex space-x-14`}>
          <Overview />
          <div className='w-[90%] pl-44 -mt-4'>
            <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
              <div className='flex items-center'>
                <BsListUl className='mr-3' />
                Upcoming Projects
              </div>
              <hr className=' w-80' />
            </div>
            <List columns={column} data={data} />
          </div>
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
      name: '',
      role: '',
      status: 'processing'
    }
    const list = await axios.post(`https://api.projectmana.online//api/project/list`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        list: list.data.projects
      }
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        error: 'error.response.data.message',
      },
    }
  }
}
