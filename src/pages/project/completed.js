import Head from 'next/head'
import { Inter } from '@next/font/google'
import SideBar from '@/components/sidebar'
import NavBar from '@/components/navbar'
import { useRouter } from 'next/router'
import Overview from '@/components/project/overview'

const inter = Inter({ subsets: ['latin'] })

export default function Completed() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Completed Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main >
                <div className='flex space-x-12'>
                    <Overview />
                    <div>Completed project page</div>
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