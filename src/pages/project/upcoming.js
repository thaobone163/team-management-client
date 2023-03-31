import Head from 'next/head'
import Overview from '@/components/project/overview'
import List from '@/components/project/list'
import React from 'react'

export default function Upcoming() {
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
                Header: 'Progress',
                accessor: 'progress'
            }
        ],
        []
    )

    const data = React.useMemo(
        () => [
            {
                project: 'U Project 1',
                role: 'Member',
                status: 'Processing',
                progress: 0.72
            },
            {
                project: 'U Project 2',
                role: 'Member',
                status: 'Processing',
                progress: 0.2
            },
            {
                project: 'U Project 3',
                role: 'Leader',
                status: 'Processing',
                progress: 0.9
            },
            {
                project: 'U Project 4',
                role: 'Reviewer',
                status: 'Processing',
                progress: 0.25
            },
            {
                project: 'U Project 5',
                role: 'Member',
                status: 'Processing',
                progress: 0.55
            },
            {
                project: 'U Project 6',
                role: 'Leader',
                status: 'Processing',
                progress: 0.8
            },
            {
                project: 'U Project 7',
                role: 'Leader',
                status: 'Processing',
                progress: 0.2
            },
            {
                project: 'U Project 8',
                role: 'Reviewer',
                status: 'Processing',
                progress: 0.4
            },
            {
                project: 'U Project 9',
                role: 'Member',
                status: 'Processing',
                progress: 0.6
            },
            {
                project: 'U Project 10',
                role: 'Leader',
                status: 'Processing',
                progress: 0.8
            }
        ],
        []
    )
    
    return (
        <>
            <Head>
                <title>Upcoming Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main >
                <div className={`flex space-x-14 h-screen`}>
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