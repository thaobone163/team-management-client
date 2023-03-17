import { Inter } from '@next/font/google'
import { AiOutlineMenu, AiOutlineAppstoreAdd, AiOutlineSetting, AiOutlineMail } from 'react-icons/ai'
import { RxPerson } from 'react-icons/rx'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { BiTask } from 'react-icons/bi'
import { TbBrandGoogleAnalytics } from 'react-icons/tb'
import { useState } from 'react'
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] })

export default function SideBar(props) {
    const [show, setShow] = useState(true)

    function toggleShow() {
        setShow(!show)
    }

    const router = props.routers.split('/')
    const option = router[1]

    return (
        <>
            <div className='fixed z-50 -mt-28 pt-6 px-5 flex flex-col space-y-7'>
                <button onClick={toggleShow}>
                    <AiOutlineMenu className='w-6 h-6' />
                </button>
                <div className='pt-6 flex flex-col space-y-6 font-medium text-gray-700 border-r-2 h-screen'>
                    <Link href={'/user'} className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <RxPerson className='w-6 h-6 mr-5' />
                            {show ? <span className='pr-5'>Personal</span> : null}
                        </div>
                        {option === 'user' ? <div className='w-2 h-10 -my-4 mr-px bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </Link>
                    <Link href={'/'} className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <AiOutlineAppstoreAdd className='w-6 h-6 mr-5' />
                            {show ? <span className='pr-5'>Projects</span> : null}
                        </div>
                        {option === 'project' || option === '' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </Link>
                    <button className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <BiTask className='w-6 h-6 mr-5 text-gray-500' />
                            {show ? <span className='pr-5'>Tasks</span> : null}
                        </div>
                        {option === 'task' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </button>
                    <button className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <TbBrandGoogleAnalytics className='w-6 h-6 mr-5 text-gray-500' />
                            {show ? <span className='pr-5'>Analysis</span> : null}
                        </div>
                        {option === 'analysis' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </button>
                    <button className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <IoMdNotificationsOutline className='w-6 h-6 mr-5' />
                            {show ? <span className='pr-5'>Notification</span> : null}
                        </div>
                        {option === 'notification' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </button>
                    <button className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <AiOutlineSetting className='w-6 h-6 mr-5' />
                            {show ? <span className='pr-5'>Setting</span> : null}
                        </div>
                        {option === 'setting' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </button>
                    <button className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <AiOutlineMail className='w-6 h-6 mr-5' />
                            {show ? <span className='pr-5'>Contact</span> : null}
                        </div>
                        {option === 'contact' ? <div className='w-2 h-10 mr-px -my-4 bg-sky-400 rounded-l-md'></div> : <div className='w-2 h-10 mr-px -my-4 rounded-l-md'></div>}
                    </button>
                </div>
            </div>
        </>
    )
}
