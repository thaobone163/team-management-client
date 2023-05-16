import Head from 'next/head'
import { Inter } from '@next/font/google'
import Overview from '@/components/project/Overview'
import List from '@/components/project/List'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { BsListUl } from 'react-icons/bs'
import { invitationList } from '@/util/mics'

const inter = Inter({ subsets: ['latin'] })

export default function Pending({ error, list }) {
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
        Header: 'Action',
        accessor: 'action'
      }
    ],
    []
  )

  const data = React.useMemo(
    () => {
      const data = []
      if (!error) {
        list.map((item) => {
          data.push({
            id: item.project_id,
            project: item.project_name,
            role: item.role,
            status: 'Pending'
          })
        })
      }
      return data
    },
    []
  )

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
            <div className='w-[90%] pl-44 -mt-4'>
              <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
                <div className='flex items-center'>
                  <BsListUl className='mr-3' />
                  Pending Approval Invitation
                </div>
                <hr className='w-[450px]' />
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
        <title>Pending Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className='flex space-x-12'>
          <Overview />
          <div className='w-[90%] pl-44 -mt-4'>
            <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
              <div className='flex items-center'>
                <BsListUl className='mr-3' />
                Pending Approval Invitation
              </div>
              <hr className='w-[450px]' />
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
