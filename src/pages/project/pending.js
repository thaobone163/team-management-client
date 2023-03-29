import Head from 'next/head'
import { Inter } from '@next/font/google'
import Overview from '@/components/project/overview'
import List from '@/components/project/list'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Pending() {
    const column = React.useMemo(
        () => [
            {
                Header: 'Project',
                accessor: 'project'
            },
            {
                Header: 'Role',
                accessor: 'role'
            },
            {
                Header: 'Status',
                accessor: 'status'
            },
            {
                Header: 'Action',
                accessor: 'action'
            }
        ],
        []
    )

    const data = React.useMemo(
        () => [
            {
                project: 'Pending Approval 1',
                role: 'Member',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 2',
                role: 'Member',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 3',
                role: 'Leader',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 4',
                role: 'Reviewer',
                status: 'Pending',
                action: ''
            },
            {
                project: 'Pending Approval 5',
                role: 'Member',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 6',
                role: 'Leader',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 7',
                role: 'Leader',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 8',
                role: 'Reviewer',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 9',
                role: 'Member',
                status: 'Pending'
            },
            {
                project: 'Pending Approval 10',
                role: 'Leader',
                status: 'Pending'
            }
        ],
        []
    )

    return (
        <>
            <Head>
                <title>Pending Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main >
                <div className='flex space-x-12 h-screen'>
                    <Overview />
                    <List columns={column} data={data} />
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