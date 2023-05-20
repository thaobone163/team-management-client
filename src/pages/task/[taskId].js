import { formatToFE } from "@/util/common"
import { commentTask, deleteTask, getProjectId, getTaskById, getUserByEmail, updateTitleDescriptionTask } from "@/util/mics"
import axios from "axios"
import { useFormik } from "formik"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { identicon } from 'minidenticons'
import { AiOutlineDelete } from 'react-icons/ai'
import Head from "next/head"
import EditTask from "@/components/task/EditTask"
import History from "@/components/task/History"
import { BsSend, BsInfoCircle } from 'react-icons/bs'
import Link from "next/link"
import Error from "@/components/Error"

export default function TaskDetail({ taskInfo, projectInfo, error }) {
  const [detail, setDetail] = useState(taskInfo)
  const router = useRouter()
  const [isDisableTitle, setIsDisableTitle] = useState(true)
  const { taskId } = router.query

  const validate = values => {
    const errors = {};
    if (!/^ *([0-9]+(mo|month|months))? *([0-9]+(w|week|weeks))? *([0-9]+(d|day|days))? *([0-9]+(h|hour|hours))? *([0-9]+(m|minute|minutes))? *$/i.test(values.estimate)) {
      errors.estimate = 'Invalid estimated time';
    }

    return errors;
  };

  const formComment = useFormik({
    initialValues: {
      comment: ''
    },
    onSubmit: comment,
    onReset: resetComment
  })

  function resetComment() {
    formComment.setValues({ ...formComment.values, comment: '' })
  }

  async function comment(values) {
    await commentTask(taskId, values.comment).then((data) => {
      console.log(data);
      if (data.success) {
        setDetail({ ...detail, updates: data.task.updates })
        resetComment()
      } else {
        alert(data.message)
      }
    })
  }
  const formTitle = useFormik({
    initialValues: taskInfo === undefined ? {} : {
      title: taskInfo.title,
      description: taskInfo.description,
      projectId: taskInfo.projectId,
      projectInfo: projectInfo,
      creator: taskInfo.creator,
      createdAt: taskInfo.createdAt,
      stage: taskInfo.stage,
      status: taskInfo.status,
      assign: taskInfo.assign,
      duedate: formatToFE(taskInfo.duedate),
      estimate: taskInfo.estimate,
      spend: taskInfo.spend,
      tags: taskInfo.tags,
      update: taskInfo.update
    },
    onSubmit: updateTitle,
    onReset: resetTitle
  });

  function resetTitle() {
    formTitle.setValues({ ...formTitle.values, title: detail.title, description: detail.description })
    setIsDisableTitle(true)
  }

  async function updateTitle(values) {
    await updateTitleDescriptionTask(taskId, values.title, values.description).then((data) => {
      if (data.success) {
        setDetail({ ...detail, title: data.task.title, description: data.task.description, updates: data.task.updates })
        setIsDisableTitle(true)
      } else {
        alert(data.message)
      }
    })
  }

  async function handleDeleteTask() {
    await deleteTask(taskId).then((data) => {
      if (data.success) {
        router.replace(`/project/${taskInfo.projectId}?tab=Tasks`)
      }
    })
  }

  if (error) {
    return (
      <>
        <Head>
          <title>Error Task</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main >
          <div>
            <Error error={error} />
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{detail.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`flex justify-between`}>
        <div className="w-[70%]">
          <div className="flex flex-col space-y-4">
            <div className="text-sm text-gray-600 flex">
              <Link href={`/project/${detail.projectId}`} className="pr-2 font-medium hover:text-sky-500">
                {projectInfo.name}
              </Link>
              &gt;
              <div className="px-2 font-medium hover:text-sky-500">
                {detail.stage}
              </div>
              &gt;
              <div className="pl-2 font-medium hover:text-sky-500">
                {detail.title}
              </div>
            </div>
            <hr />
            <div className="flex items-start space-x-14">
              <div className="flex space-x-2 items-center text-md text-gray-600">
                <span className={`${detail.status === 'Todo' ? 'bg-rose-400' : detail.status === 'Doing' ? 'bg-sky-400' : detail.status === 'Done' ? 'bg-green-400' : 'bg-yellow-400'} text-white text-sm py-1 px-1.5 font-semibold rounded-md shadow`}>{detail.status}</span>
                <span className="italic">Created at {detail.createdAt} by </span>
                <div className="hs-tooltip [--trigger:hover] [--placement:right]">
                  <div className="hs-tooltip-toggle flex items-center">
                    <img src={
                      'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(detail.creator.email.replace('@', '')))
                    }
                      alt={detail.assign}
                      className="w-6 h-6 mr-1.5 border shadow rounded-full" />
                    {detail.creator.full_name}
                    <span className="border rounded-xl ml-2 py-1 px-1.5 text-xs text-start">Owner</span>
                  </div>
                  <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute hidden invisible z-50 max-w-xs bg-white border border-gray-100 text-left rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700" role="tooltip">
                    <div className="flex items-start justify-between p-5">
                      <div className="flex items-center space-x-3">
                        <img src={
                          'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(detail.creator.email.replace('@', ''), 60))
                        }
                          alt={detail.creator.full_name}
                          className="w-16 h-16 border-2 shadow rounded-full" />
                        <div className="flex flex-col text-md text-gray-700">
                          {detail.creator.full_name}
                        </div>
                      </div>
                    </div>
                    <div className="pb-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      <hr className="w-56" />

                      <dl className="mt-3 text-cyan-600">
                        <dt className="font-bold pt-3 first:pt-0 dark:text-white">Email Address:</dt>
                        <dd className="text-gray-600 dark:text-gray-400">{detail.creator.email}</dd>
                        <dt className="font-bold pt-3 first:pt-0 dark:text-white">Phone Number:</dt>
                        <dd className="text-gray-600 dark:text-gray-400">{detail.creator.phone_number}</dd>
                        <dt className="font-bold pt-3 first:pt-0 dark:text-white">Date of Birth:</dt>
                        <dd className="text-gray-600 dark:text-gray-400">{detail.creator.dob}</dd>
                        <dt className="font-bold pt-3 first:pt-0 dark:text-white">Sex:</dt>
                        <dd className="text-gray-600 dark:text-gray-400">{detail.creator.gender}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button onClick={() => { setIsDisableTitle(false) }} className="border border-gray-400 rounded-md py-1 px-3 shadow">Edit</button>
                <button data-hs-overlay="#hs-vertically-centered-delete-task" className="flex items-center rounded-md shadow bg-rose-500 text-white text-sm font-semibold py-1 px-1.5">
                  <AiOutlineDelete className="mr-1.5" />
                  Delete
                </button>
                <div id="hs-vertically-centered-delete-task" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                  <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                    <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                        <h3 className="font-bold text-gray-800 dark:text-white">
                          Delete this task
                        </h3>
                        <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-delete-task">
                          <span className="sr-only">Close</span>
                          <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 overflow-y-auto">
                        <p className="text-gray-800 dark:text-gray-400">
                          If you select &apos;Delete&apos; , this task will be permanently deleted and cannot be undone! <br /><br />
                          <span className="font-medium">Are you sure delete this task?</span>
                        </p>
                      </div>
                      <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                        <button type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-delete-task">
                          Cancel
                        </button>
                        <button onClick={handleDeleteTask} data-hs-overlay="#hs-vertically-centered-delete-task" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-rose-500 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form className="flex flex-col space-y-2" onSubmit={formTitle.handleSubmit} onReset={formTitle.handleReset}>
              <div className="relative">
                <label htmlFor='title'
                  className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'
                  hidden={isDisableTitle}>
                  Title
                </label>
                {
                  isDisableTitle
                    ? <span className="text-gray-800 text-lg font-semibold rounded-lg w-full px-4">{detail.title}</span>
                    : <input type='text'
                      id='title'
                      className={`text-gray-800 text-lg font-semibold rounded-lg w-full px-4 mt-3 py-3 border-sky-500 shadow focus:ring-0 focus:border-sky-500`}
                      value={formTitle.values.title}
                      onChange={formTitle.handleChange}
                      placeholder="ex: First Task"
                      required
                    />
                }
              </div>
              {
                isDisableTitle
                  ? <div className="text-gray-800 text-sm italic font-normal rounded-lg w-full px-4 pb-6 break-words">
                    {detail.description}
                  </div>
                  : <div className="relative">
                    <label htmlFor='description'
                      hidden={isDisableTitle}
                      className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                      Description
                    </label>
                    <textarea type='text'
                      rows={3}
                      id='description'
                      className={`text-gray-800 text-sm italic font-normal rounded-lg w-full px-4 mt-3 py-3 border-sky-500 shadow focus:ring-0 focus:border-sky-500`}
                      value={formTitle.values.description}
                      onChange={formTitle.handleChange}
                      placeholder="ex: Description ..."
                    />
                  </div>
              }
              <div className="flex justify-end">
                {
                  isDisableTitle
                    ? null
                    : <>
                      <button type="submit" className="bg-green-400 text-white font-medium rounded-md py-1 px-3 mr-5 shadow">Save Changes</button>
                      <button type='reset' className="border border-gray-400 rounded-md py-1 px-3 shadow">Cancel</button>
                    </>
                }
              </div>
            </form>
          </div>
          <div className="flex flex-col space-y-5 pb-10 w-full">
            <History history={detail.updates} className='w-full' />
            <form className="relative" onSubmit={formComment.handleSubmit} onReset={formComment.handleReset}>
              <label htmlFor='comment'
                className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                Comment
              </label>
              <textarea type='text'
                rows={6}
                id='comment'
                className='shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-3 px-4 focus:ring-0 focus:border-sky-500'
                value={formComment.values.comment}
                onChange={formComment.handleChange}
                placeholder="ex: Write a comment ..."
              />
              <div className="flex space-x-4 pt-2">
                <button type={'submit'} className="flex items-center bg-blue-500 text-white font-medium px-2.5 py-1.5 rounded-md shadow">
                  <BsSend className="mr-2" />
                  Send
                </button>
                <button type={'reset'} className="flex items-center border border-gray-300 text-gray-700 font-medium px-2.5 py-1.5 rounded-md shadow">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col space-y-5 border-l fixed right-0 -mt-28 px-5 py-24 overflow-y-scroll overscroll-y-contain h-screen w-[24%]">
          <div className="flex items-center text-2xl text-cyan-600 font-semibold">
            <BsInfoCircle className='mr-3' />
            Task details
          </div>
          <hr className="w-full" />
          <EditTask taskId={taskId} taskInfo={taskInfo} projectInfo={projectInfo} detail={{ detail, setDetail }} />
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = context.req.headers.cookie?.split('token=')[1];
  if (!token) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false
      }
    }
  }

  const { taskId } = context.query
  try {
    const taskInfo = await axios.get(`https://api.projectmana.online//api/task/read/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    const creator = await axios.get(`https://api.projectmana.online//api/user/${taskInfo.data.task.creator}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    const projectInfo = await axios.get(`https://api.projectmana.online//api/project/${taskInfo.data.task.projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    const user = await axios.get(`https://api.projectmana.online//api/user/${projectInfo.data.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    const plan = await axios.get(`https://api.projectmana.online//api/planning/read/${taskInfo.data.task.projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

    return {
      props: {
        taskInfo: { ...taskInfo.data.task, creator: creator.data },
        projectInfo: {
          name: projectInfo.data.project_name,
          user: {
            email: projectInfo.data.user.email,
            name: user.data.full_name,
          },
          teammate: projectInfo.data.teammate,
          timeline: plan.data.plan.timeline,
        },
      },
    }
  } catch (error) {
    return {
      props: {
        error: error.response.data.message,
      },
    }
  }
}
