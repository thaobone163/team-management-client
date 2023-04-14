import Head from 'next/head'
import Overview from '@/components/project/overview'
import List from '@/components/project/list'
import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { getProjectList, getUserByEmail } from '@/util/mics'

export default function Upcoming({ overview, error, list }) {
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
          progress: 0.2
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
          <Overview overview={overview} />
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
    const res = await axios.get(`https://api.projectmana.online//api/user/projects/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    // const list = await axios.get(`https://api.projectmana.online//api/project/list?status=processing`,
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // })

    return {
      props: {
        overview: res.data,
        // list: list.data.data.projects
        list: []
      }
    }
  } catch (error) {
    console.log(error.response);
    return {
      props: {
        error: error.response.data.message,
      },
    }
  }
}
