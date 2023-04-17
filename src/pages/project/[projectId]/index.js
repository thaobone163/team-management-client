import Detail from "@/components/project/detail/detail";
import Overview from "@/components/project/overview";
import { denyInvitation, getPlanProject } from "@/util/mics";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { BiSquareRounded } from 'react-icons/bi'

export default function ProjectDetail({ data, error, plan }) {
  const router = useRouter()
  const { projectId } = router.query
  const [alwayUpdate, setAlwayUpdate] = useState('')
  useEffect(() => {
    getPlanProject(projectId).then((data) => {
      if (data.success) {
        setAlwayUpdate(data.plan)
      }
    })
  })

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

  function leaveProject() {
    denyInvitation(projectId).then((data) => {
      if (data.success) {
        router.replace('/project/upcoming')
      } else {
        alert(data.message)
      }
    })
  }

  return (
    <>
      <Head>
        <title>{data.project_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`flex space-x-14 h-screen`}>
          <Overview />
          <div className="pl-44 -mt-5 space-y-7 w-full">
            <div className="flex justify-between items-start mr-10">
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
              <button data-hs-overlay="#hs-vertically-centered-modal" className="p-2 bg-rose-400 text-white rounded-md shadow-md font-semibold">Leave project</button>
              <div id="hs-vertically-centered-modal" class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                  <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                    <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                      <h3 class="font-bold text-gray-800 dark:text-white">
                        Leave Project Confirm
                      </h3>
                      <button type="button" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                        <span class="sr-only">Close</span>
                        <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                    <div class="p-4 overflow-y-auto">
                      <p class="text-gray-800 dark:text-gray-400">
                        If you select `&apos;`Leave`&apos;` , you will no longer have access to this project! <br /><br />
                        <span className="font-medium">Are you sure leave this project?</span>
                      </p>
                    </div>
                    <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                      <button type="button" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                        Cancel
                      </button>
                      <button onClick={leaveProject} class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                        Leave
                      </button>
                    </div>
                  </div>
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

    const plan = await axios.get(`https://api.projectmana.online//api/planning/read/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        data: response.data,
        plan: plan.data.plan
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
