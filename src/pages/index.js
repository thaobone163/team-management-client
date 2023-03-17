import NavBar from '@/components/navbar';
import SideBar from '@/components/sidebar';
import { getUser } from '@/util/mics';
import { Inter } from '@next/font/google'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

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

export default function Home() {
  const router = useRouter()
  return (
    <>
      <NavBar />
      <SideBar routers={router.asPath} />
      <div className='mt-28 ml-48 pl-10 space-y-8'>This is homepage</div>
    </>
  )
}
