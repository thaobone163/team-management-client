import { BsCalendarCheck, BsJournalCheck } from 'react-icons/bs'
import {SiSimpleanalytics} from 'react-icons/si'
export default function Test() {
  return (
    <>
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="relative p-6 md:px-16 md:py-5">
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
              <h2 className="text-2xl text-sky-800 font-bold sm:text-3xl dark:text-gray-200">
                Application to support team work management
              </h2>

              <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
                <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-sky-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700 active" id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1" aria-controls="tabs-with-card-1" role="tab">
                  <span className="flex">
                    <BsCalendarCheck className="flex-shrink-0 mt-2 h-16 w-16 md:w-7 md:h-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200" />
                    <span className="grow ml-6">
                      <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">Planned and logical</span>
                      <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">Carry out team work with specific goals and plans</span>
                    </span>
                  </span>
                </button>

                <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-sky-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700" id="tabs-with-card-item-2" data-hs-tab="#tabs-with-card-2" aria-controls="tabs-with-card-2" role="tab">
                  <span className="flex">
                    <BsJournalCheck className="flex-shrink-0 mt-2 h-16 w-16 md:w-7 md:h-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200" />
                    <span className="grow ml-6">
                      <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">Monitoring and evaluation</span>
                      <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">Monitor and objectively evaluate tasks and team work</span>
                    </span>
                  </span>
                </button>

                <button type="button" className="hs-tab-active:bg-white hs-tab-active:shadow-md hs-tab-active:hover:border-transparent text-left hover:bg-sky-200 p-4 md:p-5 rounded-xl dark:hs-tab-active:bg-slate-900 dark:hover:bg-gray-700" id="tabs-with-card-item-3" data-hs-tab="#tabs-with-card-3" aria-controls="tabs-with-card-3" role="tab">
                  <span className="flex">
                    <SiSimpleanalytics className="flex-shrink-0 mt-2 h-16 w-16 md:w-7 md:h-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200"/>
                    <span className="grow ml-6">
                      <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 dark:text-gray-200">Statistics and analysis</span>
                      <span className="block mt-1 text-gray-800 dark:hs-tab-active:text-gray-200 dark:text-gray-200">Statistics and analysis of the progress of tasks and projects</span>
                    </span>
                  </span>
                </button>
              </nav>
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                <div>
                  <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">
                    <img className="shadow-xl h-[450px] bg-gradient-to-tr from-sky-200 to-emerald-200 shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="/Planning_Addock_loisirs.png" alt="Image Description" />
                  </div>

                  <div id="tabs-with-card-2" className="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-2">
                    <img className="shadow-xl h-[450px] bg-gradient-to-tr from-sky-200 to-emerald-200 shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="/stay-focused.png" alt="Image Description" />
                  </div>

                  <div id="tabs-with-card-3" className="hidden" role="tabpanel" aria-labelledby="tabs-with-card-item-3">
                    <img className="shadow-xl h-[450px] bg-gradient-to-tr from-sky-200 to-emerald-200 shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="/analysis.png" alt="Image Description" />
                  </div>
                </div>

                <div className="hidden absolute top-0 right-0 translate-x-20 md:block lg:translate-x-20">
                  <svg className="w-16 h-auto text-sky-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                    <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                    <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
            <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gradient-to-tr from-sky-100 to-emerald-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-white/[.075]"></div>
          </div>
        </div>
      </div>
    </>
  )
}
