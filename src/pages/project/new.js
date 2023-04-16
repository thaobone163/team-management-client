import Head from 'next/head'
import Overview from '@/components/project/overview'
import React from 'react'
import Info from "@/components/project/info";
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Create({ error }) {
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

  const data = React.useMemo(
    () => (
      {
        project_name: '',
        description: '',
        user: {
          email: '',
          role: 'Leader'
        },
        teammate: []
      }
    )
  )

  return (
    <>
      <Head>
        <title>Create Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={`flex space-x-14 h-screen`}>
          <Overview />
          <div className="pl-56 space-y-5">
            <div className='text-3xl font-semibold text-teal-500'>
              Create New Project
            </div>
            <Info value={data} />
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

  return {
    props: {}
  }
}
