import { getUser, updateProfile, forgot } from '@/util/mics'
import { Inter } from '@next/font/google'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { FcCancel, FcApproval } from 'react-icons/fc'
import { format } from 'date-fns'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const inter = Inter({ subsets: ['latin'] })

function formatToFE(date_string) {
    const data = date_string.split('/')
    const day = data[0]
    const month = data[1]
    const year = data[2]
    return year + '-' + month + '-' + day
}

function formatToBE(date_string) {
    return format(new Date(date_string), 'dd/MM/yyyy')
}

export default function Profile() {
    const [isDisable, setIsDisable] = useState(true)
    const [modalInfo, setModalInfo] = useState({ success: true, message: '' })
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            await getUser().then((data) => {
                formik.setValues({
                    full_name: data.full_name,
                    dob: data.dob === null ? '' : formatToFE(data.dob),
                    email: data.email === null ? '' : data.email,
                    phone: data.phone_number === null ? '' : data.phone_number,
                    sex: data.gender === null ? '' : data.gender
                })
            })
        }
        fetchData()
    }, [])

    const formik = useFormik({
        initialValues: {
            full_name: '',
            dob: '',
            email: '',
            phone: '',
            sex: ''
        },
        onSubmit: handleUpdate,
    });

    console.log(formik.values);
    async function handleUpdate(values) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setModalInfo({
                success: false,
                message: "Email chưa nhập đúng định dạng"
            })
        } else {
            await updateProfile(values.full_name, values.email, formatToBE(values.dob), values.phone, values.sex).then((data) => {
                if (data.success) {
                    setModalInfo(data);
                    if (data.isChangeEmail) {
                        forgot(values.email).then((res) => {
                            if (res.success) {
                                console.log("check email");
                                alert('Hệ thống đã gửi password cho email mới! Vui lòng đăng nhập lại')
                                Cookies.remove('token')
                                router.replace('/auth/login')
                            }
                        })
                    } else {
                        router.reload()
                    }
                } else setModalInfo(data);
            })
        }
    }

    function toggleDisable() {
        setIsDisable(!isDisable)
    }

    function cancel() {
        setIsDisable(!isDisable)
        router.reload()
    }

    return (
        <>
            <div className='space-y-7'>
                <div className='text-xl font-semibold text-teal-500'>
                    Personal Information
                    <hr className='w-64 h-px' />
                </div>
                <form className='px-16 space-y-3 w-2/3' onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor='full_name'
                            className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                            Full Name
                        </label>
                        <input type='text'
                            id='full_name'
                            disabled={isDisable}
                            className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='dob'
                            className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                            Date of Birth
                        </label>
                        <input type={isDisable ? "text" : "date"}
                            id='dob'
                            disabled={isDisable}
                            placeholder='ex: mm/dd/yyyy'
                            className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'
                            className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500' >
                            Email Address
                        </label>
                        <input type='email'
                            id='email'
                            disabled={isDisable}
                            className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='phone'
                            className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                            Phone Number
                        </label>
                        <input type='text'
                            id='phone'
                            placeholder={'ex: 0123456789'}
                            disabled={isDisable}
                            className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='sex'
                            className='z-10 absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                            Sex
                        </label>
                        <select id='sex'
                            disabled={isDisable}
                            onChange={formik.handleChange}
                            value={formik.values.sex}
                            className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500 disabled:border-sky-600 disabled:text-gray-900'>
                            <option defaultValue={''}>Select option</option>
                            <option value={'Female'}>Female</option>
                            <option value={'Male'}>Male</option>
                            <option value={'Other'}>Other</option>
                        </select>
                    </div>
                    <div className={modalInfo.success ? "text-green-500 text-sm font-semibold -mb-4" : "text-red-500 text-sm font-semibold -mb-4"}>{modalInfo.message}</div>
                    <div className='flex justify-end -mr-10 pt-4'>
                        {isDisable ?
                            <button onClick={toggleDisable} className='flex text-teal-700 bg-teal-50 font-bold rounded-md px-3 py-2 shadow-lg'>
                                <CiEdit className='w-6 h-6 mr-3' />
                                Edit
                            </button> :
                            <div className='flex space-x-5'>
                                <button type='submit' className='flex text-emerald-700 font-bold bg-emerald-50 rounded-md px-3 py-2 shadow-lg'>
                                    <FcApproval className='w-6 h-6 mr-3' />
                                    Save
                                </button>
                                <button onClick={cancel} className='flex text-rose-700 font-bold bg-rose-50 rounded-md px-3 py-2 shadow-lg'>
                                    <FcCancel className='w-6 h-6 mr-3' />
                                    Cancel
                                </button>
                            </div>
                        }
                    </div>
                </form>

            </div>
        </>
    )
}