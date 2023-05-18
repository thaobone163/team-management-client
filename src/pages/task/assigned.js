import ListTask from "@/components/task/List";
import { simpleTimer } from "@/util/common";
import { formatDate } from "@/util/common";
import axios from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { BsListUl } from 'react-icons/bs'


export default function Assigned({ list, error }) {
  const [listTask, setListTask] = useState(list)

  const columns = React.useMemo(
    () => [
      {
        Header: 'Title',
        accessor: 'title'
      },
      {
        Header: 'Project',
        accessor: 'project'
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Duedate',
        accessor: 'duedate'
      },
      {
        Header: 'Estimate',
        accessor: 'estimate'
      },
      {
        Header: 'CreatedAt',
        accessor: 'createdAt'
      }
    ],
    []
  )

  const data = React.useMemo(
    () => {
      const data = []
      listTask.map((task) => {
        const time = task.createdAt.split(' ')
        data.push({
          id: task.projectId,
          title: task.title,
          project: task.projectName,
          description: task.description,
          status: task.status,
          duedate: formatDate(task.duedate),
          estimate: simpleTimer(task.estimate),
          createdAt: time[0] + ' ' + formatDate(time[1])
        })
      })
      return data
    },
    []
  )


  if (error) {
    return (
      <>
        <Head>
          <title>Assigned Task</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div className='flex space-x-12'>
            <div className='w-[90%] pl-44 -mt-4'>
              <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
                <div className='flex items-center'>
                  <BsListUl className='mr-3' />
                  Assigned Task
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
        <title>Assigned Task</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={`flex space-x-14`}>
          <div className='-mt-4 w-[95%]'>
            <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
              <div className='flex items-center'>
                <BsListUl className='mr-3' />
                Assigned Task
              </div>
              <hr className=' w-80' />
            </div>
            <ListTask columns={columns} data={data} className='w-full'/>
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
    const list = await axios.get(`https://api.projectmana.online//api/task/assign`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        list: list.data.tasks,
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
