import { useRouter } from "next/router"
import { SlPencil } from 'react-icons/sl'
import { identicon } from 'minidenticons'
import { CircularProgressbarWithChildren, CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Link from "next/link"

export default function OverviewDetail() {
  const router = useRouter()
  const { projectId } = router.query

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[48%]">
          <div className="flex flex-col bg-white p-5 shadow rounded-md">
            <div className="flex items-center justify-between font-semibold text-lg text-sky-600">
              Project {projectId}
              <Link href={`${projectId}/edit`}>
                <button className="flex items-center text-sm text-gray-500 font-normal">
                  <SlPencil className="w-3 h-3 mr-2" />
                  edit
                </button>
              </Link>
            </div>
            <hr className="h-px" />
            <div className="text-md text-gray-700 font-medium p-5 pb-0">
              Project Members (3)
              <div className="flex justify-between pt-3 tracking-tighter">
                <div className="flex items-center space-x-1.5">
                  <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon('Thao Bone') }} />
                  <div className="flex flex-col text-sm text-gray-700">
                    Thao Bone
                    <span className="text-gray-500 text-xs">Member</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon('The Khai') }} />
                  <div className="flex flex-col text-sm text-gray-700">
                    The Khai
                    <span className="text-gray-500 text-xs">Leader</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-8 h-8 border-2 shadow rounded-full" dangerouslySetInnerHTML={{ __html: identicon('Minh Ngoc') }} />
                  <div className="flex flex-col text-sm text-gray-700">
                    Minh Ngoc
                    <span className="text-gray-500 text-xs">Wating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[48%]">
          <div className="flex justify-between bg-white p-5 shadow rounded-md">
            <div className="font-semibold text-lg text-gray-600">
              Progress
              <p className="p-4 pb-0 font-medium text-sm">
                Your team has completed 25% of the project. <br/><br/>
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
      </div>
    </>
  )
}

