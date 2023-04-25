import { Inter } from '@next/font/google'
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IoLogOutOutline } from 'react-icons/io5'
import { identicon } from 'minidenticons'

const inter = Inter({ subsets: ['latin'] })

export default function NavBar() {
  const [user, setUser] = useState({ email: '', full_name: '' })
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    const decoded = jwt_decode(token)
    setUser({
      email: decoded.userEmail,
      full_name: decoded.userFullname
    })
  }, [])

  function handleSignOut() {
    Cookies.remove('token')
    router.replace('/auth/login')
  }

  return (
    <>
      <div className="fixed z-40 bg-white px-16 py-4 border-b shadow-lg shadow-gray-100 w-full flex justify-between">
        <a href='' className="text-4xl font-semibold text-sky-500">Team.</a>
        <div className='flex space-x-9'>
          <Link href={`/user`} className="flex space-x-3 items-center">
            <img src={
              'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(user.email.replace('@', ''), 60))
            }
              alt={user.email}
              className="w-9 h-9 border-1 shadow rounded-full" />
            <div className='font-semibold text-lg text-gray-700'>{user.full_name}</div>
          </Link>
          <button onClick={handleSignOut} className='flex items-center border rounded-md px-4'>
            <IoLogOutOutline className='w-6 h-6 mr-2' />
            Sign Out
          </button>
        </div>
      </div>
    </>
  )
}
