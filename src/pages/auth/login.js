import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import { Inter } from '@next/font/google'
import Poster from '@/components/poster';
import Link from 'next/link';
import { login, loginGoogle } from '@/util/mics';
import { useRouter } from 'next/router';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';

const inter = Inter({ subsets: ['latin'] })

export default function Login() {
    const [modalInfo, setModalInfo] = useState({ success: true, message: '' })
    const router = useRouter()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: handlerLogin,
    });

    async function handlerLogin(values) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setModalInfo({
                success: false,
                message: "Email chưa nhập đúng định dạng"
            })
        } else {
            await login(values.email, values.password).then((data) => {
                if (data.success) {
                    setModalInfo(data);
                    router.replace('/')
                } else {
                    setModalInfo(data)
                    if (data.message === 'Tài khoản chưa được xác thực') {
                        router.push({
                            pathname: '/auth/verify',
                            query: {
                                email: values.email
                            }
                        })
                    }
                };
            })
        }
    }

    async function handelrGoogleLogin() {
        const left = (screen.width / 2 - 500/2)
        const test = window.open('http://api.projectmana.online/api/google', '_blank', 'height=650, width=500, left=' + left + '')
        const current = window.setInterval(function () {
            if (test.closed !== false) {
                window.clearInterval(current)
                loginGoogle().then((data) => {
                    if (data.success) {
                        setModalInfo(data);
                        router.replace('/')
                    } else setModalInfo(data);
                })
            }
        })
    }

    // Password type
    const [showMe, setShowMe] = useState(false);
    function toggleShow() {
        setShowMe(!showMe);
    }

    return (
        <>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <div className="pl-12 pt-[31px] w-full">
                    <a href='' className="text-4xl font-semibold text-sky-500">Team.</a>
                </div>
                <div className="flex px-8 pr-24 w-full">
                    <Poster></Poster>
                    <div className="w-1/3">
                        <div className="text-4xl font-semibold text-gray-700">Welcome back!</div>
                        {/* form */}
                        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
                            <div className="pt-4">
                                <label htmlFor="email"
                                    className={modalInfo.success ? "absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500" :
                                        "absolute ml-5 px-2 bg-white text-sm font-medium text-red-500"} >
                                    Email Address
                                </label>
                                <input type="email" id="email"
                                    className={modalInfo.success ? "mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500" :
                                        "mt-2 border border-red-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-red-500"}
                                    placeholder='Enter your registered email address'
                                    onChange={formik.handleChange}
                                    value={formik.values.email} />
                            </div>
                            <div className="pt-5">
                                <label htmlFor="password"
                                    className={modalInfo.success ? "absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500" :
                                        "absolute ml-5 px-2 bg-white text-sm font-medium text-red-500"}>
                                    Password
                                </label>
                                <div className="flex items-center">
                                    <input type={showMe ? "text" : "password"} id="password"
                                        className={modalInfo.success ? "mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-sky-500" :
                                            "mt-2 border border-red-500 text-gray-900 text-sm rounded-lg w-full py-5 px-7 focus:ring-0 focus:border-red-500"}
                                        placeholder='Enter your password'
                                        onChange={formik.handleChange}
                                        value={formik.values.password} />
                                    <button type="button" onClick={toggleShow} className="-ml-14">
                                        {!showMe ?
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeClosed"><path d="M2 10s3.5 4 10 4 10-4 10-4" /><path d="M4 11.645L2 14" /><path d="M22 14l-1.996-2.352" /><path d="M8.914 13.68L8 16.5" /><path d="M15.063 13.688L16 16.5" /></svg> :
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gray" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ai ai-EyeOpen"><path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" /><circle cx="12" cy="12" r="3" /></svg>
                                        }
                                    </button>
                                </div>
                            </div>
                            {modalInfo.success ? null : <div className="text-red-500 text-sm font-semibold -mb-4">{modalInfo.message}</div>}
                            <div className="pt-5 flex justify-end">
                                <Link href={`/auth/forgot`}>
                                    <button className="block text-sky-400 text-sm font-semibold">Forgot Password ?</button>
                                </Link>
                            </div>
                            <button type="submit"
                                className="mt-6 bg-sky-500 py-4 w-full rounded-xl text-white font-semibold">
                                Continue
                            </button>
                            <div className=" relative mt-7 inline-flex items-center justify-center w-full">
                                <span className="absolute px-3 text-gray-400 text-sm -translate-x-1/2 left-1/2 bg-white">Or Sign in with</span>
                                <hr className="w-64 h-px my-5 bg-gray-300 border-0" />
                            </div>

                            <div className="flex justify-center">
                                <button onClick={handelrGoogleLogin} type="button" className="w-full mt-2 border-gray-300 border rounded-lg p-3 inline-flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" width="24" height="24" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
                                    Google Account
                                </button>
                            </div>
                            <div className="flex justify-end mt-5 text-gray-500">
                                Not a member?
                                <Link href={`/auth/register`} className="mx-2 text-sky-600 font-medium">Create an account</Link>
                            </div>
                        </form>
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
            props: {}
        }
    }
    return {
        redirect: {
            destination: '/',
            permanent: false
        }
    }
}