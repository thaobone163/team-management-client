import { changePassword } from '@/util/mics'
import { Inter } from '@next/font/google'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FcKey, FcCancel, FcApproval } from 'react-icons/fc'
import jwt_decode from "jwt-decode"

const inter = Inter({ subsets: ['latin'] })

export default function Password() {
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [change, setChange] = useState(false)
    const router = useRouter()
    const [modalInfo, setModalInfo] = useState({ success: true, message: '' })


    const formikPass = useFormik({
        initialValues: {
            current_password: '',
            new_password: '',
            cf_new_password: '',
        },
        onSubmit: handlerChangePass,
    });

    async function handlerChangePass(values) {
        if ((values.new_password !== values.cf_new_password)) {
            setModalInfo({
                success: false,
                message: 'Mật khẩu xác nhận chưa hợp lệ'
            })
        } else {
            await changePassword(values.current_password, values.new_password).then((data) => {
                if (data.success) {
                    setModalInfo(data);
                    router.reload()
                } else setModalInfo(data);
            })
        }
    }

    function toggleChange() {
        setChange(!change)
    }

    function toggleShowCurrent() {
        setShowCurrent(!showCurrent)
    }

    function toggleShowNew() {
        setShowNew(!showNew)
    }

    function toggleShowConfirm() {
        setShowConfirm(!showConfirm)
    }

    return (
        <>

            <div className='space-y-7 pb-10'>
                <div className='text-xl font-semibold text-teal-500'>
                    Password
                    <hr className='w-64 h-px' />
                </div>
                {change ?
                    <form className='px-16 space-y-4 w-2/3' onSubmit={formikPass.handleSubmit}>
                        <div>
                            <label htmlFor='current_password'
                                className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                                Current Password
                            </label>
                            <input type={showCurrent ? "text" : "password"}
                                id='current_password'
                                className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                                placeholder='Enter your current password'
                                onChange={formikPass.handleChange}
                                value={formikPass.values.current_password}
                            />
                            <button type="button" onClick={toggleShowCurrent} className="-ml-14">
                                {!showCurrent ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeClosed"><path d="M2 10s3.5 4 10 4 10-4 10-4" /><path d="M4 11.645L2 14" /><path d="M22 14l-1.996-2.352" /><path d="M8.914 13.68L8 16.5" /><path d="M15.063 13.688L16 16.5" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeOpen"><path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" /><circle cx="12" cy="12" r="3" /></svg>
                                }
                            </button>
                        </div>
                        <div>
                            <label htmlFor='new_password'
                                className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                                New Password
                            </label>
                            <input type={showNew ? "text" : "password"}
                                id='new_password'
                                className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                                placeholder='Enter your new password'
                                onChange={formikPass.handleChange}
                                value={formikPass.values.new_pasword}
                            />
                            <button type="button" onClick={toggleShowNew} className="-ml-14">
                                {!showNew ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeClosed"><path d="M2 10s3.5 4 10 4 10-4 10-4" /><path d="M4 11.645L2 14" /><path d="M22 14l-1.996-2.352" /><path d="M8.914 13.68L8 16.5" /><path d="M15.063 13.688L16 16.5" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeOpen"><path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" /><circle cx="12" cy="12" r="3" /></svg>
                                }
                            </button>
                        </div>
                        <div>
                            <label htmlFor='cf_new_password'
                                className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                                Confirm New Password
                            </label>
                            <input type={showConfirm ? "text" : "password"}
                                id='cf_new_password'
                                className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                                placeholder='Enter your confirm new password'
                                onChange={formikPass.handleChange}
                                value={formikPass.values.cf_new_password}
                            />
                            <button type="button" onClick={toggleShowConfirm} className="-ml-14">
                                {!showConfirm ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeClosed"><path d="M2 10s3.5 4 10 4 10-4 10-4" /><path d="M4 11.645L2 14" /><path d="M22 14l-1.996-2.352" /><path d="M8.914 13.68L8 16.5" /><path d="M15.063 13.688L16 16.5" /></svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeOpen"><path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" /><circle cx="12" cy="12" r="3" /></svg>
                                }
                            </button>
                        </div>
                        <div className={modalInfo.success ? "text-green-500 text-sm font-semibold -mb-4" : "text-red-500 text-sm font-semibold -mb-4"}>{modalInfo.message}</div>
                        <div className='flex justify-end -mr-10 space-x-5 pt-4'>
                            <button type='submit' className='flex text-emerald-700 font-bold bg-emerald-50 rounded-md px-3 py-2 shadow-lg'>
                                <FcApproval className='w-6 h-6 mr-3' />
                                Save
                            </button>
                            <button onClick={toggleChange} className='flex text-rose-700 font-bold bg-rose-50 rounded-md px-3 py-2 shadow-lg'>
                                <FcCancel className='w-6 h-6 mr-3' />
                                Cancel
                            </button>
                        </div>
                    </form> :
                    <button onClick={toggleChange} className='flex text-gray-600 bg-gray-50 font-medium rounded-md px-3 py-2 shadow-lg'>
                        <FcKey className='w-6 h-6 mr-3' />
                        Change password for this account?
                    </button>
                }
            </div>
        </>
    )
}
