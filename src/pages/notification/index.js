import Error from "@/components/Error";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from 'react-icons/io'

export default function Notification({ notification, error }) {
  console.log(notification);
  const [list, setList] = useState(notification.listNotification)
  const [filter, setFilter] = useState('all')

  useEffect(()=> {
    if(filter === 'unread') {
      setList(notification.listNotification.filter((item,_) => item.status === 'Unread'))
    }
    if(filter === 'all') {
      setList(notification.listNotification)
    }
  }, [])


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
