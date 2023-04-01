import Head from 'next/head'
import Overview from '@/components/project/overview'
import List from '@/components/project/list'
import React from 'react'
import Add from '@/components/project/add'

export default function Upcoming() {
    return (
        <>
            <Head>
                <title>Create Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main >
                <div className={`flex space-x-14 h-screen`}>
                    <Overview />
                    <Add />
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
    return {
        props: {}
    }
}
