import Head from 'next/head'
import Overview from '@/components/project/overview'
import React from 'react'
import List from '@/components/project/list'

export default function Completed() {
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
                project: 'Completed Project 1',
                role: 'Member',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 2',
                role: 'Member',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 3',
                role: 'Leader',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 4',
                role: 'Reviewer',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 5',
                role: 'Member',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 6',
                role: 'Leader',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 7',
                role: 'Leader',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 8',
                role: 'Reviewer',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 9',
                role: 'Member',
                status: 'Completed',
                progress: 1
            },
            {
                project: 'Completed Project 10',
                role: 'Leader',
                status: 'Completed',
                progress: 1
            }
        ],
        []
    )

    return (
        <>
            <Head>
                <title>Completed Project</title>
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
                destination: 'auth/login',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}