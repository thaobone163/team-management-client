import Detail from "@/components/project/detail/detail";
import Overview from "@/components/project/overview";
import { getPlanProject } from "@/util/mics";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { BiSquareRounded } from 'react-icons/bi'

export default function ProjectDetail({ data, error, overview, plan }) {
  const router = useRouter()
  const { projectId } = router.query
  const [alwayUpdate, setAlwayUpdate] = useState('')

  if (error) {
    useEffect(() => {
      alert(error)
      router.replace('/project/upcoming')
    })
    return (
      <></>
    )
  }

  useEffect (() => {
    getPlanProject(projectId).then((data) => {
      if(data.success) {
        setAlwayUpdate(data.plan)
      }
    })
  })

  return (
    <>
      <Head>
        <title>{data.project_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`flex space-x-14 h-screen`}>
          <Overview overview={overview}/>
          <div className="pl-44 -mt-5 space-y-7 w-full">
            <div>
              <div className='flex items-center text-2xl font-semibold uppercase text-gray-600'>
                <BiSquareRounded className="mr-2 text-sky-600 w-4 h-4" />
                {data.project_name}
                <span className="italic font-normal normal-case text-base ml-5 mt-1">(Create at: {data.project_createdAt})</span>
              </div>
              <div className='w-fit rounded-bl-lg border-l-2 border-b-2 border-gray-300 -mt-1.5 ml-1.5 pl-5 '>
                <div className="pt-3 pl-1 -mb-3 bg-white flex items-center text-md text-gray-600">
                  <BiSquareRounded className="mr-2 w-3 h-3 text-gray-400" />
                  {alwayUpdate.topic}
                </div>
              </div>
            </div>
            <Detail data={data} plan={plan} timeline={alwayUpdate.timeline} />
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
    const res = await axios.get(`https://api.projectmana.online//api/user/projects/count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    const plan = await axios.get(`https://api.projectmana.online//api/planning/read/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      props: {
        data: response.data,
        overview: res.data,
        plan: plan.data.plan
      },
    }
  } catch (error) {
    console.log(error.response.data);
    return {
      props: {
        error: error.response.data.message,
      },
    }
  }
}
