import { useRouter } from "next/router"
import { SlPencil } from 'react-icons/sl'
import { identicon } from 'minidenticons'
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from "next/link"

export default function Planning() {
    const router = useRouter()
    const { projectId } = router.query

    return (
        <>
            <div className="flex justify-between w-full">
                <div className="flex flex-col w-[48%]">
                    <div className="flex flex-col bg-white p-5 shadow rounded-md">
                        <form>
                            <div>
                                <label htmlFor='topic'
                                    className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                                    Topic
                                </label>
                                <input type='text'
                                    id='topic'
                                    className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full p-4 focus:ring-0 focus:border-sky-500'
                                    defaultValue={'Team-management'}
                                // onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor='target'
                                    className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                                    Target
                                </label>
                                <textarea type='text'
                                    id='target'
                                    className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full h-fit p-4 focus:ring-0 focus:border-sky-500'
                                    defaultValue={'Build a website to support team work management'}
                                // onChange={formik.handleChange}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col w-[48%]">
                    <div className="flex justify-between bg-white p-5 shadow rounded-md">
                        Timeline
                    </div>
                </div>
            </div>
        </>
    )
}

