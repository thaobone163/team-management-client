import Head from 'next/head'
import { Inter } from '@next/font/google'
import SideBar from '@/components/Sidebar'
import NavBar from '@/components/Navbar'
import { useRouter } from 'next/router'
import Profile from '@/components/user/Profile'
import Password from '@/components/user/Password'

const inter = Inter({ subsets: ['latin'] })

export default function User() {
    const router = useRouter()

    return (
        <>
            <Head>
                <title>Update Profile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main >
                <div className='space-y-8'>
                    <Profile></Profile>
                    <hr className='h-1 bg-sky-200 rounded-full w-3/4'/>
                    <Password></Password>
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
