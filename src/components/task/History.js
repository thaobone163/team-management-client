import { BsActivity, BsPersonCheckFill, BsPencilFill, BsClockFill, BsCalendarEvent, BsTagsFill } from 'react-icons/bs'
import { AiOutlineComment } from 'react-icons/ai'
import { formatDate } from '@/util/common'

const colorTag = new Map([
  [0, 'bg-slate-400'],
  [1, 'bg-red-400'],
  [2, 'bg-orange-400'],
  [3, 'bg-amber-400'],
  [4, 'bg-yellow-400'],
  [5, 'bg-lime-400'],
  [6, 'bg-green-400'],
  [7, 'bg-emerald-400'],
  [8, 'bg-teal-400'],
  [9, 'bg-cyan-400'],
  [10, 'bg-sky-400'],
  [11, 'bg-blue-400'],
  [12, 'bg-indigo-400'],
  [13, 'bg-violet-400'],
  [14, 'bg-purple-400'],
  [15, 'bg-fuchsia-400'],
  [16, 'bg-pink-400'],
  [17, 'bg-rose-400'],
])

export default function History({ history }) {
  return (
    <>
      <div className="flex items-center text-2xl text-cyan-600 font-semibold">
        <BsActivity className="mr-3" />
        Activity
      </div>
      <ol className="w-full ml-10 relative text-md text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {history.map((activity, index) => {
          const content = activity.content.split('; ')
          return (
            <div key={index} className='w-full'>
              {
                content.map((item, index) => {
                  const split = item.split(': ')

                  if (split[0] === 'Assign') {
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <BsPersonCheckFill />
                        </span>
                        <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                        <span className="pt-2.5 text-sm italic break-words"> {item.replace('Assign:', 'Assigned to')} at {activity.timestamp}</span>
                      </li>
                    )
                  } else if (split[0] === 'Due Date') {
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14 ">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <BsCalendarEvent />
                        </span>
                        <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                        <span className="pt-2.5 text-sm italic break-words">Changed duedate to {formatDate(split[1])} at {activity.timestamp}</span>
                      </li>
                    )
                  } else if (split[0] === 'Comment') {
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14 ">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <AiOutlineComment />
                        </span>
                        <div className="flex items-center">
                          <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                          <span className="text-sm italic">added a comment at {activity.timestamp}</span>
                        </div>
                        <blockquote className="pt-2.5 text-sm space-x-5">
                          <svg className="h-3 w-3 text-gray-500 dark:text-gray-700" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3ZM14.6242 10.3C14.6242 11.0733 14.3755 11.7 13.878 12.18C13.3805 12.6333 12.7521 12.86 11.9928 12.86C11.0764 12.86 10.3171 12.5533 9.71484 11.94C9.13881 11.3266 8.85079 10.4467 8.85079 9.29999C8.85079 8.07332 9.19117 6.87332 9.87194 5.69999C10.5789 4.49999 11.5608 3.55332 12.8176 2.85999L13.7209 4.25999C13.0401 4.73999 12.4903 5.27332 12.0713 5.85999C11.6786 6.44666 11.4168 7.12666 11.2858 7.89999C11.5215 7.79332 11.7964 7.73999 12.1106 7.73999C12.8437 7.73999 13.446 7.97999 13.9173 8.45999C14.3886 8.93999 14.6242 9.55333 14.6242 10.3Z" fill="currentColor" />
                          </svg>
                          <div className=' break-words'>
                            {split[1]}
                          </div>
                        </blockquote>
                      </li>
                    )
                  } else if (split[0] === 'Tags') {
                    const tags = split[1].split(',')
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14 w-full">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <BsTagsFill />
                        </span>
                        <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                        <div className="flex flex-wrap text-sm italic pt-2.5 break-words w-full">
                          <span className='mr-2 my-1'>Changed tags to</span>
                          {tags.map((tag, index) => (
                            <div key={index} className={`text-xs ${colorTag.get(index)} text-white p-1 mr-2 my-1 rounded font-semibold max-w-[50%] whitespace-nowrap`}>
                              {tag}
                            </div>
                          ))}
                          <span className='mr-2 my-1'>
                            at {activity.timestamp}
                          </span>
                        </div>
                      </li>
                    )
                  } else if (split[0] === 'Estimate' || split[0] === 'Spend') {
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <BsClockFill />
                        </span>
                        <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                        <span className="pt-2.5 text-sm italic break-words">Changed {item.replace(':', ' time to').toLowerCase()} at {activity.timestamp}</span>
                      </li>
                    )
                  } else if (split[0] === 'Status') {
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <BsPencilFill />
                        </span>
                        <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                        <div className="flex space-x-2 text-sm italic pt-2.5 break-words">
                          <span>Changed status to</span>
                          <span className={`w-fit ${split[1] === 'Todo' ? 'bg-rose-400' : split[1] === 'Doing' ? 'bg-sky-400' : split[1] === 'Done' ? 'bg-green-400' : 'bg-yellow-400'} text-white text-xs p-1 font-semibold rounded-md shadow`}>{split[1]}</span>
                          <span>
                            at {activity.timestamp}
                          </span>
                        </div>
                      </li>
                    )
                  } else {
                    return (
                      <li key={index} className="mb-7 ml-6 mr-14">
                        <span className=" absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                          <BsPencilFill />
                        </span>
                        <h3 title={activity.user.email} className="font-medium leading-tight text-gray-700 mr-1">{activity.user.full_name}</h3>
                        <span className="pt-2.5 text-sm italic break-words">Changed {item.replace(':', ' to').replace(split[0], split[0].toLowerCase())} at {activity.timestamp}</span>
                      </li>
                    )
                  }
                })
              }
            </div>
          )
        })}
      </ol>
    </>
  )
}
