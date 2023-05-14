import { getUserByEmail, updateAssignTask, updateStatusTask } from "@/util/mics";
import { updateDescriptionTask, updateStageTask, updateTitleTask } from "@/util/mics";
import { useFormik } from "formik";
import { useState } from "react";
import Assign from "./Assign";
import EditField from "./EditField";
import { timeTracking } from "@/util/common";

export default function EditTask({ taskId, taskInfo, projectInfo, detail }) {
  const [isDisableForTitle, setIsDisableForTitle] = useState(true)
  const [isDisableDes, setIsDisableDes] = useState(true)
  const [isDisableStage, setIsDisableStage] = useState(true)
  const [isDisableStatus, setIsDisableStatus] = useState(true)
  const [isDisableAssign, setIsDisableAssign] = useState(true)

  const formOnlyTitle = useFormik({
    initialValues: {
      title: taskInfo.title,
    },
    onSubmit: updateTitle,
    onReset: resetTitle
  });

  function resetTitle() {
    formOnlyTitle.setValues({ ...formOnlyTitle.values, title: detail.detail.title })
    setIsDisableForTitle(true)
  }

  async function updateTitle(values) {
    await updateTitleTask(taskId, values.title).then((data) => {
      if (data.success) {
        detail.setDetail({ ...detail.detail, title: data.task.title, updates: data.task.updates })
        setIsDisableForTitle(true)
      } else {
        alert(data.message)
      }
    })
  }

  const formDescription = useFormik({
    initialValues: {
      description: taskInfo.description,
    },
    onSubmit: updateDescription,
    onReset: resetDescription
  });

  function resetDescription() {
    formDescription.setValues({ ...formDescription.values, description: detail.detail.description })
    setIsDisableDes(true)
  }

  async function updateDescription(values) {
    await updateDescriptionTask(taskId, values.description).then((data) => {
      if (data.success) {
        detail.setDetail({ ...detail.detail, description: data.task.description, updates: data.task.updates })
        setIsDisableDes(true)
      } else {
        alert(data.message)
      }
    })
  }

  const formStage = useFormik({
    initialValues: {
      stage: taskInfo.stage,
    },
    onSubmit: updateStage,
    onReset: resetStage
  });

  function resetStage() {
    formStage.setValues({ ...formStage.values, stage: detail.detail.stage })
    setIsDisableStage(true)
  }

  async function updateStage(values) {
    await updateStageTask(taskId, values.stage).then((data) => {
      if (data.success) {
        detail.setDetail({ ...detail.detail, stage: data.task.stage, updates: data.task.updates })
        setIsDisableStage(true)
      } else {
        alert(data.message)
      }
    })
  }

  const formStatus = useFormik({
    initialValues: {
      status: taskInfo.status,
    },
    onSubmit: updateStatus,
    onReset: resetStatus
  });

  function resetStatus() {
    formStatus.setValues({ ...formStatus.values, status: detail.detail.status })
    setIsDisableStatus(true)
  }

  async function updateStatus(values) {
    await updateStatusTask(taskId, values.status).then((data) => {
      if (data.success) {
        detail.setDetail({ ...detail.detail, status: data.task.status, updates: data.task.updates })
        setIsDisableStatus(true)
      } else {
        alert(data.message)
      }
    })
  }

  const formAssign = useFormik({
    initialValues: {
      assign: taskInfo.assign,
    },
    onSubmit: updateAssign,
    onReset: resetAssign
  });

  function resetAssign() {
    formAssign.setValues({ ...formAssign.values, assign: detail.detail.assign })
    setIsDisableAssign(true)
  }

  async function updateAssign(values) {
    await updateAssignTask(taskId, values.assign).then((data) => {
      if (data.success) {
        detail.setDetail({ ...detail.detail, assign: data.task.assign, updates: data.task.updates })
        setIsDisableAssign(true)
      } else {
        alert(data.message)
      }
    })
  }

  return (
    <>
      <div className="flex flex-col space-y-2">
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='title' />
        <hr />
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='description' />
        <hr />
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='stage' />
        <hr />
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='status' />
        <hr />
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='assign' />
        <hr />
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='tags' />
        <hr />
        <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='duedate' />
        <hr />
        <div className="flex flex-col text-gray-600 pt-3 space-y-3">
          <span className="font-semibold">
            Time tracking
          </span>
          <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
            {
              timeTracking(detail.detail.spend, detail.detail.estimate) >= 100
                ? <div className="flex flex-col justify-center overflow-hidden bg-rose-500 min-w-full"></div>
                : <div className="flex flex-col justify-center overflow-hidden bg-blue-500" role="progressbar" style={{ width: `${timeTracking(detail.detail.spend, detail.detail.estimate)}%` }} aria-valuenow={timeTracking(detail.detail.spend, detail.detail.estimate)} aria-valuemin="0" aria-valuemax="100"></div>

            }
          </div>
        </div>
        <div>
          <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='estimate' />
          <EditField taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={detail} field='spend' />
        </div>
      </div >
    </>
  )
}
