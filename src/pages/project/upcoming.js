import Head from 'next/head'
import Overview from '@/components/project/overview'
import List from '@/components/project/list'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getProjectList, getUserByEmail } from '@/util/mics'

export default function Upcoming({error, list}) {
  const router = useRouter()
  if (error) {
    useEffect(() => {
      alert(error)
      router.reload()
    })
    return (
      <></>
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
        Header: 'Progress',
        accessor: 'progress'
      }
    ],
    []
  )

  const data = React.useMemo(
    () => {
      const data = []
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
    },
    []
  )

  return (
    <>
      <Head>
        <title>Upcoming Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={`flex space-x-14`}>
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
