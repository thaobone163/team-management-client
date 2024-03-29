import { useEffect, useState } from "react";
import Progress from "./Progress";
import TaskProject from "./TaskProject";
import TaskStage from "./TaskStage";
import TimeTracking from "./TimeTracking";
import { stageTaskGraph } from "@/util/mics";
import { useRouter } from "next/router";

export default function Graph({ projectId, plan }) {
  const [data, setData] = useState({
    totalTask: [],
    doneAndUndoneTask: []
  })
  const router = useRouter()

  async function stageTask() {
    await stageTaskGraph(projectId).then((data) => {
      if (data.success) {
        setData({
          totalTask: data.totalTask,
          doneAndUndoneTask: data.doneAndUndoneTask
        })
      }
    })
  }

  useEffect(() => {
    stageTask()
  }, [router.asPath])

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="capitalize text-xl text-cyan-700 font-semibold">
          Analysis
        </div>
        <div className="flex flex-col space-y-4 items-center">
          <div className=" flex flex-col items-center space-y-2 text-lg text-sky-600 font-medium capitalize bg-white p-5 rounded-lg shadow w-full">
            <span>
              Spend time for each stage
            </span>
            <TimeTracking projectId={projectId} />
          </div>
          <div className=" flex flex-col items-center space-y-2 text-lg text-sky-600 font-medium capitalize bg-white p-5 rounded-lg shadow w-full">
            <span>
              Progress by stage
            </span>
            <div className="w-[50%] ">
              <Progress plan={plan} />
            </div>
          </div>
          <div className=" flex flex-col items-center space-y-2 text-lg text-sky-600 font-medium capitalize bg-white p-5 rounded-lg shadow w-full">
            <span>
              Task of project
            </span>
            <div className="w-[50%] ">
              <TaskProject totalTask={data.totalTask}/>
            </div>
          </div>
          <div className=" flex flex-col items-center space-y-2 text-lg text-sky-600 font-medium capitalize bg-white p-5 rounded-lg shadow w-full">
            <span>
              Task of each stage
            </span>
            <TaskStage doneAndUndoneTask={data.doneAndUndoneTask} />
          </div>
        </div>
      </div>
    </>
  )
}
