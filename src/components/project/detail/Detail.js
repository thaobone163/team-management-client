import { useState } from "react";
import OverviewDetail from "./Overview";
import Planning from "./Planning";
import Task from "@/components/task/Task";
import { useRouter } from "next/router";
import Link from "next/link";
import Document from "./document/Document";

export default function Detail({ data, plan, timeline }) {
  const [openTab, setOpenTab] = useState('');
  const router = useRouter()
  const { projectId, tab } = router.query

  return (
    <>
      <div className="flex flex-wrap pr-10 w-full">
        <div className=" border-gray-200 bg-white w-full">
          <ul
            className="flex list-none flex-wrap px-3 pt-2 pb-0.5 flex-row justify-between w-full rounded border bg-gray-50"
            role="tablist"
          >
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Overview'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Overview');
                  router.push(`${projectId}?tab=Overview`)
                }}
                data-toggle="tab"
                href="#overview"
                role="tablist"
              >
                Overview
              </Link>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Planning'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Planning');
                  router.push(`${projectId}?tab=Planning`)
                }}
                data-toggle="tab"
                href="#planning"
                role="tablist"
              >
                Planning
              </Link>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Tasks'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Tasks');
                  router.push(`${projectId}?tab=Tasks`)
                }}
                data-toggle="tab"
                href="#tasks"
                role="tablist"
              >
                Tasks
              </Link>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Document'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Document');
                  router.push(`${projectId}?tab=Document`)
                }}
                data-toggle="tab"
                href="#document"
                role="tablist"
              >
                Document
              </Link>
            </li>
            <li className="mr-2 last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-sm font-bold uppercase px-5 py-2 block leading-normal " +
                  (openTab === 'Statistic'
                    ? "text-sky-700 border-b-2 border-blue-600"
                    : "text-gray-500 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab('Statistic');
                  router.push(`${projectId}?tab=Statistic`)
                }}
                data-toggle="tab"
                href="#statistic"
                role="tablist"
              >
                Statistic
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col w-full">
            <div className="py-3 flex-auto w-full">
              <div className="tab-content tab-space w-full p-5 rounded-md border bg-gray-50">
                <div className={`w-full ${openTab === 'Overview' || tab === 'Overview' || tab === undefined? "block" : "hidden"}`} id="overview">
                  <OverviewDetail data={data} timeline={timeline} />
                </div>
                <div className={openTab === 'Planning' || tab === 'Planning' ? "block" : "hidden"} id="planning">
                  <Planning plan={plan} role={data.user.role} />
                </div>
                <div className={openTab === 'Tasks' || tab === 'Tasks' ? "block" : "hidden"} id="tasks">
                  <Task project_data={data} timeline={plan.timeline} />
                </div>
                <div className={openTab === 'Document' || tab === 'Document' ? "block" : "hidden"} id="document">
                  <Document project_Info={{name: data.project_name, id: data.project_id}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
