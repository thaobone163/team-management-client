import { Inter } from '@next/font/google'
import { AiOutlineMenu, AiOutlineAppstoreAdd, AiOutlineSetting, AiOutlineMail } from 'react-icons/ai'
import { RxLetterCaseLowercase, RxPerson } from 'react-icons/rx'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiTask } from 'react-icons/bi'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { SlHome } from 'react-icons/sl'
import { getListNotification } from '@/util/mics'

const inter = Inter({ subsets: ['latin'] })

export default function SideBar(props) {
  const [show, setShow] = useState(true)
  const [notice, setNotice] = useState(false)
  const router = useRouter()
  const path = router.asPath.split('/')
  const option = path[1]

  useEffect(() => {
    getListNotification().then((data) => {
      if (data.success) {
        if (data.data.countUnread !== 0)
          setNotice(true)
        else
          setNotice(false)
      }
    })
  }, [router.asPath])

  function toggleShow() {
    setShow(!show)
    props.onChange()
  }



  return (
    <>
      <div className='fixed z-50 pt-4 px-5 flex flex-col space-y-7'>
        <button onClick={toggleShow}>
          <AiOutlineMenu className='w-6 h-6' />
        </button>
        <div className='pt-6 flex flex-col space-y-6 font-medium text-gray-700 border-r-2 h-screen'>
          <Link href={'/'} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <SlHome className='w-6 h-6 mr-5' />
              {show ? <span className='pr-5'>Home</span> : null}
            </div>
            {option === '' ? <div className='w-2 h-10 -my-4 mr-px bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
          </Link>
          <Link href={'/user'} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <RxPerson className='w-6 h-6 mr-5' />
              {show ? <span className='pr-5'>Personal</span> : null}
            </div>
            {option === 'user' ? <div className='w-2 h-10 -my-4 mr-px bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
          </Link>
          <Link href={'/project/upcoming'} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <AiOutlineAppstoreAdd className='w-6 h-6 mr-5' />
              {show ? <span className='pr-5'>Projects</span> : null}
            </div>
            {option === 'project' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
          </Link>
          <Link href={'/task/assigned'} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <BiTask className='w-6 h-6 mr-5 text-gray-500' />
              {show ? <span className='pr-5'>Tasks</span> : null}
            </div>
            {option === 'task' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
          </Link>
          <Link href={'/notification'} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <IoMdNotificationsOutline className='w-6 h-6' />
              <div className={`${notice ? 'w-2 h-2 bg-sky-400 rounded-full -mt-3 mr-3' : 'mr-5'} `}></div>
              {show ? <span className='pr-5'>Notification</span> : null}
            </div>
            {option === 'notification' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
          </Link>
          <Link href={'/contact'} className='flex items-center justify-between'>
            <div className='flex items-center'>
              <AiOutlineMail className='w-6 h-6 mr-5' />
              {show ? <span className='pr-5'>Contact</span> : null}
            </div>
            {option === 'contact' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
          </Link>
        </div>
      </div>
    </>
  )
}
