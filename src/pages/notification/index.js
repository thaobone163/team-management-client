import Error from "@/components/Error";
import { formatDate } from "@/util/common";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdAssignmentInd } from 'react-icons/md'
import { AiOutlineComment, AiOutlineUsergroupAdd } from 'react-icons/ai'
import Link from "next/link";
import { readNotification } from "@/util/mics";

export default function Notification({ notification, error }) {
  const [list, setList] = useState(notification.listNotification)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (filter === 'unread') {
      setList(notification.listNotification.filter((item, _) => item.status === 'Unread'))
    }
    if (filter === 'all') {
      setList(notification.listNotification)
    }
  }, [filter])

  async function read() {
    await readNotification()
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Notification</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div>
            <Error error={error} />
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Notification</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        <div className={`-mt-4 w-[95%]`}>
          <div className='text-2xl text-gray-600 font-semibold pb-8 uppercase w-fit flex flex-col space-y-3'>
            <div className='flex items-center'>
              <IoMdNotificationsOutline className='mr-3' />
              Notifications
            </div>
            <hr className=' w-80' />
          </div>
          <div className="flex space-x-4 mx-14">
            <button onClick={() => { setFilter('all') }} className={`${filter === 'all' ? 'bg-sky-200 text-sky-600 border-sky-200' : 'bg-white text-gray-600'}  text-md font-medium shadow border rounded-lg py-0.5 px-3`}>All</button>
            <button onClick={() => { setFilter('unread') }} className={`${filter === 'unread' ? 'bg-sky-200 text-sky-600 border-sky-200' : 'bg-white text-gray-600'}  text-md font-medium shadow border rounded-lg py-0.5 px-3`}>Unread ({notification.countUnread})</button>
          </div>
          <div className="m-14 flex flex-col space-y-4">
            {list.map((item) => {
              const time = item.createdAt.split(' ')
              return (
                <div key={item._id} className="flex items-center justify-around shadow w-[50%] px-5 rounded-lg border">
                  <div className="flex space-x-5 items-center">
                    {
                      item.type === 'Assign'
                        ? <Link href={`/task/${item.taskId}`} onClick={read} className="flex space-x-5 items-center">
                          <MdAssignmentInd className="w-12 h-12 text-blue-400" />
                          <div className="flex flex-col space-y-2 py-3 pr-5">
                            <span className="text-sm text-gray-700 font-semibold">Assignment</span>
                            <span className="text-md text-gray-700 italic w-80">{item.content}</span>
                            <span className="text-sm text-sky-600 font-medium">{time[0]} {formatDate(time[1])}</span>
                          </div>
                        </Link>
                        : item.type === 'Invite'
                          ? <Link href={`/project/pending`} onClick={read} className="flex space-x-5 items-center">
                            <AiOutlineUsergroupAdd className="w-12 h-12 text-blue-400" />
                            <div className="flex flex-col space-y-2 py-3 pr-5">
                              <span className="text-sm text-gray-700 font-semibold">Invitation</span>
                              <span className="text-md text-gray-700 italic w-80">{item.content}</span>
                              <span className="text-sm text-sky-600 font-medium">{time[0]} {formatDate(time[1])}</span>
                            </div>
                          </Link>
                          : <Link href={`/task/${item.taskId}`} onClick={read} className="flex space-x-5 items-center">
                            <AiOutlineComment className="w-12 h-12 text-blue-400" />
                            <div className="flex flex-col space-y-2 py-3 pr-5">
                              <span className="text-sm text-gray-700 font-semibold">Message</span>
                              <span className="text-md text-gray-700 italic w-80">{item.content}</span>
                              <span className="text-sm text-sky-600 font-medium">{time[0]} {formatDate(time[1])}</span>
                            </div>
                          </Link>
                    }

                  </div>
                  <div className={`w-3 h-3 ${item.status === 'Unread' ? 'bg-sky-600' : 'bg-white'} rounded-full`}></div>
                </div>
              )
            })}
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
    const notification = await axios.get(`https://api.projectmana.online/api/notification/list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        notification: notification.data.data,
      },
    }
  } catch (error) {
    console.log(error.response.data);
    return {
      props: {
        error: error.response.data,
      },
    }
  }
}
