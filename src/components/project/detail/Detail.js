import { useState } from "react";
import OverviewDetail from "./Overview";
import Planning from "./Planning";
import Task from "@/components/task/Task";
import { useRouter } from "next/router";

export default function Detail({ data, plan, timeline }) {
  const [openTab, setOpenTab] = useState('Overview');
  const router = useRouter()
  const {projectId} = router.query

  return (
    <>
      <div className="flex flex-wrap pr-10 w-full">
        <div className=" border-gray-200 bg-white w-full">
          <ul
            className="flex list-none flex-wrap px-3 pt-2 pb-0.5 flex-row justify-between w-full rounded border bg-gray-50"
            role="tablist"
          >
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Overview'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Overview');
                  router.push(`${projectId}?tab=overview`)
                }}
                data-toggle="tab"
                href="#overview"
                role="tablist"
              >
                Overview
              </a>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Planning'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Planning');
                  router.push(`${projectId}?tab=planning`)
                }}
                data-toggle="tab"
                href="#planning"
                role="tablist"
              >
                Planning
              </a>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Tasks'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Tasks');
                  router.push(`${projectId}?tab=tasks`)
                }}
                data-toggle="tab"
                href="#tasks"
                role="tablist"
              >
                Tasks
              </a>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Document'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Document');
                  router.push(`${projectId}?tab=document`)
                }}
                data-toggle="tab"
                href="#document"
                role="tablist"
              >
                Document
              </a>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Statistic'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Statistic');
                  router.push(`${projectId}?tab=statistic`)
                }}
                data-toggle="tab"
                href="#statistic"
                role="tablist"
              >
                Statistic
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col w-full">
            <div className="py-3 flex-auto w-full">
              <div className="tab-content tab-space w-full p-5 rounded-md border bg-gray-50">
                <div className={`w-full ${openTab === 'Overview' ? "block" : "hidden"}`} id="overview">
                  <OverviewDetail data={data} timeline={timeline} />
                </div>
                <div className={openTab === 'Planning' ? "block" : "hidden"} id="planning">
                  <Planning plan={plan} role={data.user.role} />
                </div>
                <div className={openTab === 'Tasks' ? "block" : "hidden"} id="tasks">
                  <Task />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
