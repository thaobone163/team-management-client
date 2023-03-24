import { useRouter } from 'next/router'
import { MdOutlineTaskAlt, MdApproval } from 'react-icons/md'
import Link from 'next/link';


export default function Overview() {
    const router = useRouter().asPath.split('/')
    const option = router[2]

    return (
        <>
            <div className='flex flex-col justify-between w-1/6'>
                <div className='space-y-3'>
                    <div className='text-xl font-semibold text-teal-500'>
                        Project Overview
                        <hr className='h-px' />
                    </div>

                    <div className='text-white bg-gradient-to-t from-sky-300 to-sky-100 rounded-3xl p-5 space-y-3 shadow-md'>
                        <Link href={'/project/upcoming'}>
                            <div className='flex justify-between'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-Schedule"><path d="M9 20H6a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4v3" /><path d="M8 2v2" /><path d="M15 2v2" /><path d="M2 8h19" /><path d="M18.5 15.643l-1.5 1.5" /><circle cx="17" cy="17" r="5" /></svg>
                                <span className='font-bold text-3xl'>5</span>
                            </div>
                            <div className='flex justify-between items-end'>
                                <span className='w-1/3 text-md font-semibold'>Upcoming Projects</span>
                                {option === 'upcoming' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-ArrowRight"><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg> : null}
                            </div>
                        </Link>
                    </div>

                    <div className='text-white bg-gradient-to-t from-purple-400 to-purple-200 rounded-3xl p-5 space-y-3 shadow-md'>
                        <Link href={'/project/completed'}>

                            <div className='flex justify-between'>
                                <MdOutlineTaskAlt className='w-9 h-9' />
                                <span className='font-bold text-3xl'>10</span>
                            </div>
                            <div className='flex justify-between items-end'>
                                <span className='w-1/3 text-md font-semibold'>Completed Projects</span>
                                {option === 'completed' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-ArrowRight"><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg> : null}
                            </div>
                        </Link>
                    </div>

                    <div className='text-white bg-gradient-to-t from-pink-400 to-rose-200 rounded-3xl p-5 space-y-3 shadow-md'>
                        <Link href={'/project/pending'}>

                            <div className='flex justify-between'>
                                <MdApproval className='w-9 h-9' />
                                <span className='font-bold text-3xl'>3</span>
                            </div>
                            <div className='flex justify-between items-end'>
                                <span className='w-1/3 text-md font-semibold'>Pending Approval</span>
                                {option === 'pending' ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="ai ai-ArrowRight"><path d="M4 12h16" /><path d="M13 5l7 7-7 7" /></svg> : null}
                            </div>
                        </Link>
                    </div>
                    
                </div>
                <button className='bg-white border-2 border-cyan-300 mt-3 p-2 rounded-lg text-cyan-400 font-semibold'>+ Add Project</button>
            </div>
        </>
    )
}