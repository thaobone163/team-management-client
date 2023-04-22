import { useRouter } from 'next/router'
import { MdOutlineTaskAlt, MdApproval } from 'react-icons/md'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjectOverview } from '@/util/mics';


export default function Overview(props) {
  const router = useRouter().asPath.split('/')
  const [count, setCount] = useState({
    countProcessing: '',
    countCompleted: '',
    countPending: ''
  })
  const option = router[2]

  useEffect(() => {
    getProjectOverview().then((data) => {
      if (data.success) {
        if(count !== data.data) {
          setCount(data.data)
        }
      }
    })
  },[props.routerParam])

  return (
    <>
      <div className='fixed flex flex-col space-y-12 w-[13%]'>
        <div className='space-y-4'>
          <div className='text-xl font-semibold text-gray-500 text-center'>
            <span className='bg-white px-2'>Overview</span>
            <hr className='h-px -mt-3' />
          </div>
          <div className='text-white bg-gradient-to-t from-sky-400 to-cyan-300 rounded-3xl p-5 space-y-3 shadow-md'>
            <Link href={'/project/upcoming'}>
              <div className='flex justify-between'>
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-Schedule"><path d="M9 20H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v3" /><path d="M8 2v2" /><path d="M15 2v2" /><path d="M2 8h19" /><path d="M18.5 15.643l-1.5 1.5" /><circle cx="17" cy="17" r="5" /></svg>
                <span className='font-bold text-3xl'>{count.countProcessing}</span>
              </div>
              <div className='flex justify-between items-end'>
                <span className='w-1/3 text-md font-semibold'>Upcoming Projects</span>
                {option === 'upcoming' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-ArrowRight"><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg> : null}
              </div>
            </Link>
          </div>

          <div className='text-white bg-gradient-to-t from-purple-400 to-indigo-400 rounded-3xl p-5 space-y-3 shadow-md'>
            <Link href={'/project/completed'}>

              <div className='flex justify-between'>
                <MdOutlineTaskAlt className='w-9 h-9' />
                <span className='font-bold text-3xl'>{count.countCompleted}</span>
              </div>
              <div className='flex justify-between items-end'>
                <span className='w-1/3 text-md font-semibold'>Completed Projects</span>
                {option === 'completed' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-ArrowRight"><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg> : null}
              </div>
            </Link>
          </div>

          <div className='text-white bg-gradient-to-t from-pink-400 to-fuchsia-400 rounded-3xl p-5 space-y-3 shadow-md'>
            <Link href={'/project/pending'}>

              <div className='flex justify-between'>
                <MdApproval className='w-9 h-9' />
                <span className='font-bold text-3xl'>{count.countPending}</span>
              </div>
              <div className='flex justify-between items-end'>
                <span className='w-1/3 text-md font-semibold'>Pending Approval</span>
                {option === 'pending' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-ArrowRight"><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg> : null}
              </div>
            </Link>
          </div>

        </div>
        <Link href={'/project/new'} className='bg-gradient-to-t from-blue-500 to-blue-400 mt-3 p-2 rounded-lg text-white font-semibold shadow-md text-center'>
          <button >+ Add Project</button>
        </Link>
      </div>
    </>
  )
}
