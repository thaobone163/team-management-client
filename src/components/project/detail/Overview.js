import { useRouter } from "next/router"
import { SlPencil } from 'react-icons/sl'
import { identicon } from 'minidenticons'
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from "next/link"
import { MdOutlineNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { useMemo, useState } from "react";
import { convertToPercent, convertToPercentText, formatToFE } from "@/util/common";

export default function OverviewDetail({ data, timeline }) {
  const router = useRouter()
  const { projectId } = router.query
  const [currentPage, setCurrentPage] = useState(0)

  const members = [data.user].concat(data.teammate)

  const stages = [].concat(timeline)

  function next() {
    setCurrentPage(currentPage + 1)
  }
  function previous() {
    setCurrentPage(currentPage - 1)
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[48%] space-y-5">
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
                            <img src={
                              'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(data.user.email.replace('@', '')))
                            }
                              alt={data.user.email}
                              className="w-8 h-8 border-2 shadow rounded-full" />
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
                            <img src={
                              'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(value.email.replace('@', '')))
                            }
                              alt={value.detail.full_name}
                              className="w-8 h-8 border-2 shadow rounded-full" />
                            <div className="flex flex-col text-sm text-gray-700">
                              {value.detail.full_name}
                              <span className="text-gray-500 text-xs">{value.role}</span>
                            </div>
                            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute hidden invisible z-50 max-w-xs bg-white border border-gray-100 text-left rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" role="tooltip">
                              <div className="flex items-start justify-between p-5">
                                <div className="flex items-center space-x-3">
                                  <img src={
                                    'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(value.email.replace('@', ''), 60))
                                  }
                                    alt={value.detail.full_name}
                                    className="w-16 h-16 border-2 shadow rounded-full" />
                                  <div className="flex flex-col text-md text-gray-700">
                                    {value.detail.full_name}
                                    <span className="text-gray-500 text-sm">{value.role}</span>
                                  </div>
                                </div>
                                <div className={`p-1 text-xs text-white font-semibold rounded-md ${value.status === 'Joined' ? 'bg-emerald-500' : 'bg-rose-500'}`}>{value.status}</div>
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
          <div className="flex justify-between bg-white p-5 shadow rounded-md">
            <div className="font-semibold text-lg text-gray-600">
              Progress
              <p className="p-4 pb-0 font-medium text-sm">
                Your team has completed {convertToPercentText(data.project_progress)} of the project. <br /><br />
                <span className="text-sky-600">
                  Fighting!
                </span>
              </p>
            </div>
            <div className="w-28 h-28">
              <CircularProgressbar
                value={convertToPercent(data.project_progress)}
                text={`${convertToPercentText(data.project_progress)}`}
                strokeWidth={7}
                styles={
                  buildStyles({
                    textColor: "#1f2937",
                    pathColor: data.project_progress <= 0.2 ? '#f43f5e' : data.project_progress <= 0.8 ? '#eab308' : "#22c55e",
                    trailColor: data.project_progress <= 0.2 ? '#ffe4e6' : data.project_progress <= 0.8 ? '#fef9c3' : "#dcfce7"
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[48%] space-y-5">

          <div className="flex flex-col bg-white p-5 shadow rounded-md">
            <div className="text-md uppercase font-semibold text-cyan-600">
              Timeline
            </div>
            <div className="max-h-[300px] overflow-y-auto mt-3">
              <ol className="mt-5 mx-8 px-4 relative border-l border-gray-200 dark:border-gray-700">
                {
                  stages.length !== 0
                    ? stages.map((item, index) => {
                      if (item !== undefined) {
                        const formatToFe = formatToFE(item.deadline)
                        const date = new Date(formatToFe).toString().split(' ')
                        const format = date.slice(1, 4).join(' ')
                        const check = new Date(formatToFe) < new Date()
                        return (
                          <li key={index} className={`${index === timeline.length - 1 ? '' : 'mb-4'} ml-4`}>
                            <div className={`absolute w-3 h-3 ${check && Math.round(item.progress) === 1 ? 'bg-green-200' : 'bg-gray-200 '} rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700`}></div>
                            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{format}</time>
                            <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                              {item.stage}
                              <span className={`ml-2 text-sm font-medium ${item.progress <= 0.2 ? 'text-rose-600' : item.progress <= 0.8 ? 'text-yellow-500' : 'text-green-500'}`}>{convertToPercentText(item.progress)}</span>
                            </h3>
                            <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400">{item.note}</p>
                          </li>
                        )
                      }
                    })
                    : <div className="text-gray-600 text-sm italic">No timeline data yet!</div>
                }
              </ol>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}


