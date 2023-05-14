import { getUserByEmail } from "@/util/mics"
import { useEffect, useState } from "react"
import { identicon } from 'minidenticons'

export default function Assign({ email }) {
  const [info, setInfo] = useState(
    {
      email: '', full_name: '', phone_number: '', dob: '', gender: ''
    }
  )
  useEffect(() => {
    if (email !== undefined) {
      getUserByEmail(email).then((data) => {
        if (data.success) {
          setInfo({
            email: data.email,
            full_name: data.full_name,
            phone_number: data.phone_number,
            dob: data.dob,
            gender: data.gender
          })
        } else {
          alert(data.message)
        }
      })
    }
  }, [])
  return (
    <>
      <div className="hs-tooltip [--trigger:hover] [--placement:right]">
        <div className="hs-tooltip-toggle flex items-center">
          <img src={
            'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(info.email.replace('@', '')))
          }
            alt={info.email}
            className="w-6 h-6 mr-1.5 border shadow rounded-full" />
          {info.full_name}
        </div>
        <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute hidden invisible z-50 max-w-xs bg-white border border-gray-100 text-left rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" role="tooltip">
          <div className="flex items-start justify-between p-5">
            <div className="flex items-center space-x-3">
              <img src={
                'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(info.email.replace('@', ''), 60))
              }
                alt={info.email}
                className="w-16 h-16 border-2 shadow rounded-full" />
              <div className="flex flex-col text-md text-gray-700">
                {info.full_name}
              </div>
            </div>
          </div>
          <div className="pb-3 px-4 text-sm text-gray-600 dark:text-gray-400">
            <hr className="w-56" />

            <dl className="mt-3 text-cyan-600">
              <dt className="font-bold pt-3 first:pt-0 dark:text-white">Email Address:</dt>
              <dd className="text-gray-600 dark:text-gray-400">{info.email}</dd>
              <dt className="font-bold pt-3 first:pt-0 dark:text-white">Phone Number:</dt>
              <dd className="text-gray-600 dark:text-gray-400">{info.phone_number}</dd>
              <dt className="font-bold pt-3 first:pt-0 dark:text-white">Date of Birth:</dt>
              <dd className="text-gray-600 dark:text-gray-400">{info.dob}</dd>
              <dt className="font-bold pt-3 first:pt-0 dark:text-white">Sex:</dt>
              <dd className="text-gray-600 dark:text-gray-400">{info.gender}</dd>
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}
