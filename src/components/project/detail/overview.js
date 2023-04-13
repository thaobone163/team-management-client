import { useRouter } from "next/router"
import { SlPencil } from 'react-icons/sl'
import { identicon } from 'minidenticons'
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from "next/link"
import { MdOutlineNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useState } from "react";

export default function OverviewDetail({ data }) {
  const router = useRouter()
  const { projectId } = router.query
  const [currentPage, setCurrentPage] = useState(0)

  const members = [data.user].concat(data.teammate)
  console.log(members);

  function next() {
    setCurrentPage(currentPage + 1)
  }
  function previous() {
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[48%]">
          <div className="flex flex-col bg-white p-5 shadow rounded-md">
            <div className="flex items-center justify-between font-semibold text-lg text-sky-600">
              {data.project_name}
              <Link href={`${projectId}/edit`}>
                <button className="flex items-center text-sm text-gray-500 font-normal">
                  <SlPencil className="w-3 h-3 mr-2" />
                  edit
                </button>
              </Link>
            </div>
            <hr className="h-px" />
            <div className="text-md text-gray-700 font-medium p-5 pb-0">
              Project Members ({data.teammate.length + 1})
              <div className="flex flex-wrap justify-between space-y-2 pt-3 -mx-6 tracking-tighter">
                {
                  currentPage !== 0
                    ? <button onClick={previous} className="text-gray-500">
                      <MdNavigateBefore />
                    </button>
                    : <div></div>
                }
                <div className="flex space-x-5">
                  {
                    members.slice(currentPage, currentPage + 3).map((value, index) => {
                      if (value.email === data.user.email) {
                        return (
                          <div key={index} title={data.user.email} className="flex items-center space-x-1.5">
                            <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon(data.user.email) }} />
                            <div className="flex flex-col text-sm text-gray-700">
                              You
                              <span className="text-gray-500 text-xs">{data.user.role}</span>
                            </div>
                          </div>
                        )
                      }
                      return (
                        <div key={index} className="hs-tooltip [--trigger:hover] [--placement:right]">
                          <div className="hs-tooltip-toggle flex items-center space-x-1.5">
                            <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon(value.detail.full_name) }} />
                            <div className="flex flex-col text-sm text-gray-700">
                              {value.detail.full_name}
                              <span className="text-gray-500 text-xs">{value.role}</span>
                            </div>
                            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-50 max-w-xs bg-white border border-gray-100 text-left rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" role="tooltip">
                              <div className="flex items-start justify-between p-5">
                                <div className="flex items-center space-x-3">
                                  <div className="w-16 h-16 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon(value.detail.full_name) }} />
                                  <div className="flex flex-col text-md text-gray-700">
                                    {value.detail.full_name}
                                    <span className="text-gray-500 text-sm">{value.role}</span>
                                  </div>
                                </div>
                                <div className={`p-2 text-xs text-white font-semibold rounded-md bg-emerald-500`}>{value.status}</div>
                              </div>
                              <div className="pb-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                                <hr className="w-56" />

                                <dl className="mt-3 text-cyan-600">
                                  <dt className="font-bold pt-3 first:pt-0 dark:text-white">Email Address:</dt>
                                  <dd className="text-gray-600 dark:text-gray-400">{value.email}</dd>
                                  <dt className="font-bold pt-3 first:pt-0 dark:text-white">Phone Number:</dt>
                                  <dd className="text-gray-600 dark:text-gray-400">{value.detail.phone_number}</dd>
                                  <dt className="font-bold pt-3 first:pt-0 dark:text-white">Date of Birth:</dt>
                                  <dd className="text-gray-600 dark:text-gray-400">{value.detail.dob}</dd>
                                  <dt className="font-bold pt-3 first:pt-0 dark:text-white">Sex:</dt>
                                  <dd className="text-gray-600 dark:text-gray-400">{value.detail.gender}</dd>
                                </dl>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                {
                  currentPage < members.length - 3
                    ? <button onClick={next} className="text-gray-500">
                      <MdOutlineNavigateNext />
                    </button>
                    : <div></div>

                }
                {/* <div title={data.user.email} className="flex items-center space-x-1.5">
                  <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon(data.user.email) }} />
                  <div className="flex flex-col text-sm text-gray-700">
                    You
                    <span className="text-gray-500 text-xs">{data.user.role}</span>
                  </div>
                </div>
                {
                  data.teammate.map((item, index) => {
                    if (index < 2)
                      return (
                        <div key={item.email} title={item.email} className="flex items-center space-x-1.5">
                          <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon(item.detail.full_name) }} />
                          <div className="flex flex-col text-sm text-gray-700">
                            {item.detail.full_name}
                            <span className="text-gray-500 text-xs">{item.role}</span>
                          </div>
                        </div>
                      )
                  })
                } */}
              </div>
              {
                data.teammate.length > 3
                  ? <div className="text-xs text-gray-600 font-normal italic pr-2 pt-3 text-right">
                    + {data.teammate.length - 2} people
                  </div>
                  : null
              }
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[48%]">
          <div className="flex justify-between bg-white p-5 shadow rounded-md">
            <div className="font-semibold text-lg text-gray-600">
              Progress
              <p className="p-4 pb-0 font-medium text-sm">
                Your team has completed 25% of the project. <br /><br />
                <span className="text-sky-600">
                  Fighting!
                </span>
              </p>
            </div>
            <div className="w-28 h-28">
              <CircularProgressbar
                value={20}
                text={`20%`}
                strokeWidth={7}
                styles={
                  buildStyles({
                    textColor: "#1f2937",
                    pathColor: "#22c55e",
                    trailColor: "#dcfce7"
                  })
                }
              />
            </div>
          </div>
        </div>
      </div >
    </>
  )
}


