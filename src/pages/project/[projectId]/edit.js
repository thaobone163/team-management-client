import Head from 'next/head'
import Overview from '@/components/project/overview'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Info from '@/components/project/info'
import { getProjectId } from '@/util/mics'

export default function Edit() {
  const router = useRouter()
  const { projectId } = router.query
  // const [data, setData] = useState()

  // getProjectId(projectId).then((data) => {
  //   if (data.success) {
  //     setData(
  //       {
  //         project_name: data.name,
  //         user: {
  //           email: '',
  //           role: 'Leader'
  //         },
  //         teammate: [
  //           {
  //             email: 'teammate1@gmail.com',
  //             role: 'Member',
  //             confirm: 'Joined'
  //           },
  //           {
  //             email: 'teammate2@gmail.com',
  //             role: 'Reviewer',
  //             confirm: 'Wating'
  //           }
  //         ]
  //       }
  //     )
  //   } else {
  //     alert(data.message)
  //   }
  // })
  const data = React.useMemo(
    () => (
      {
        project_name: `Project ${projectId}`,
        user: {
          email: '',
          role: 'Leader'
        },
        teammate: [
          {
            email: 'teammate1@gmail.com',
            role: 'Member',
            confirm: 'Joined'
          },
          {
            email: 'teammate2@gmail.com',
            role: 'Reviewer',
            confirm: 'Wating'
          }
        ]
      }
    )
  )

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
            <Info data={data} />
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
