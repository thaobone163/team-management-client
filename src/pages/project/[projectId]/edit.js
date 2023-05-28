import Head from 'next/head'
import Overview from '@/components/project/Overview'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Info from '@/components/project/Info'
import { getProjectId } from '@/util/mics'
import axios from 'axios'
import Error from '@/components/Error'

export default function Edit({ data, error }) {
  const router = useRouter()
  const { projectId } = router.query

  if (error || data.user.status === 'Waiting') {
    return (
      <>
        <Head>
          <title>Error</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div className='flex space-x-12'>
            <Overview />
            <div className='pt-10 w-[90%] text-center text-gray-500'>
              <Error error={error ? error : 'You must accept invitation!'} />
            </div>
          </div>
        </main>
      </>
    )
  }

  const value =
  {
    project_name: data.project_name,
    description: data.project_description,
    user: {
      email: '',
      role: data.user.role
    },
    teammate: data.teammate
  }

  return (
    <>
      <Head>
        <title>Edit Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={`flex space-x-14 h-screen`}>
          <Overview />
          <div className="pl-56 space-y-5">
            <div className='text-3xl font-semibold text-teal-500'>
              Edit Project
            </div>
            <Info value={value} data={data} />
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

  const { projectId } = context.query
  try {
    const response = await axios.get(`https://api.projectmana.online//api/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        data: response.data
      },
    }
  } catch (error) {
    return {
      props: {
        error: error.response.data.message,
      },
    }
  }
}
