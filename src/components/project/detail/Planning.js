import { useRouter } from "next/router"
import 'react-circular-progressbar/dist/styles.css';
import Link from "next/link"
import { useFormik } from "formik";
import { TfiPencil } from 'react-icons/tfi'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useEffect, useState } from "react";
import { createPlan, deleteStage, getPlanProject, updatePlanProject } from "@/util/mics";
import { convertToPercentText, formatToBE, formatToFE } from "@/util/common";

export default function Planning({ plan, role }) {
  const isDisable = (role !== 'Leader')
  const router = useRouter()
  const [action, setAction] = useState('')
  const { projectId } = router.query
  const [timeline, setTimeline] = useState([])

  async function update() {
    await getPlanProject(projectId).then((data) => {
      if (data.success) {
        setTimeline(data.plan.timeline)
      }
    })
  }

  useEffect(() => {
    update()
  }, [router.asPath])

  const formik = useFormik({
    initialValues: {
      topic: plan.topic === undefined ? '' : plan.topic,
      target: plan.target === undefined ? '' : plan.target,
      oldStage: '',
      stage: '',
      note: '',
      deadline: ''
    },
    onSubmit: handleSubmit,
  })

  function handleSubmit(values) {
    if (action === 'Add') {
      createPlan(projectId, values.topic, values.target, values.stage, values.note, formatToBE(values.deadline)).then((data) => {
        if (!data.success) {
          alert(data.message)
        } else {
          formik.setFieldValue('topic', data.plan.topic)
          formik.setFieldValue('target', data.plan.target)
          formik.setFieldValue('stage', '')
          formik.setFieldValue('oldStage', '')
          formik.setFieldValue('note', '')
          formik.setFieldValue('deadline', '')
          update()
        }
      })
    } else if (action === 'Edit') {
      const deadline = values.deadline === '' ? '' : formatToBE(values.deadline)
      updatePlanProject(projectId, values.topic, values.target, values.oldStage, values.stage, values.note, deadline).then((data) => {
        if (!data.success) {
          alert(data.message)
        } else {
          formik.setFieldValue('topic', data.topic)
          formik.setFieldValue('target', data.target)
          formik.setFieldValue('stage', '')
          formik.setFieldValue('oldStage', '')
          formik.setFieldValue('note', '')
          formik.setFieldValue('deadline', '')
          update()
        }
      })
    } else if (action === 'Remove') {
      deleteStage(projectId, values.stage).then((data) => {
        if (!data.success) {
          alert(data.message)
        } else {
          formik.setFieldValue('stage', '')
          formik.setFieldValue('oldStage', '')
          formik.setFieldValue('note', '')
          formik.setFieldValue('deadline', '')
          update()
        }
      })
    }
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-[48%]">
          <div className="flex flex-col bg-white p-5 shadow rounded-md">
            <form onSubmit={formik.handleSubmit} className="space-y-3">
              <div>
                <label htmlFor='topic'
                  className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                  Topic
                </label>
                <input type='text'
                  id='topic'
                  disabled={isDisable}
                  className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full p-4 focus:ring-0 focus:border-sky-500'
                  value={formik.values.topic}
                  onChange={formik.handleChange}
                  placeholder="Enter your topic project"
                />
              </div>
              <div>
                <label htmlFor='target'
                  className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                  Target
                </label>
                <textarea type='text'
                  id='target'
                  disabled={isDisable}
                  className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full h-fit p-4 focus:ring-0 focus:border-sky-500'
                  value={formik.values.target}
                  onChange={formik.handleChange}
                  placeholder="Enter your target"
                />
              </div>
              <hr />
              <div className="space-y-2">
                Edit Timeline
                <div className="pt-3">
                  <label htmlFor='stage'
                    className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                    Stage
                  </label>
                  <input type='text'
                    id='stage'
                    disabled={isDisable}
                    className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full p-4 focus:ring-0 focus:border-sky-500'
                    value={formik.values.stage}
                    onChange={formik.handleChange}
                    placeholder="ex: stage A"
                  />
                </div>
                <div>
                  <label htmlFor='note'
                    className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                    Note
                  </label>
                  <input type='text'
                    id='note'
                    disabled={isDisable}
                    className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full p-4 focus:ring-0 focus:border-sky-500'
                    value={formik.values.note}
                    onChange={formik.handleChange}
                    placeholder="ex: note something"
                  />
                </div>
                <div>
                  <label htmlFor='deadline'
                    className='absolute ml-5 px-2 bg-white text-sm font-medium text-sky-500'>
                    Deadline
                  </label>
                  <input type='date'
                    id='deadline'
                    disabled={isDisable}
                    className='mt-2 border border-sky-500 text-gray-900 text-sm rounded-lg w-full p-4 focus:ring-0 focus:border-sky-500'
                    value={formik.values.deadline}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-around pt-5">
                <button disabled={isDisable} type="submit" onClick={() => { setAction('Add') }} className="bg-sky-500 text-white text-sm font-medium shadow rounded-md py-1.5 px-2">
                  + Add
                </button>
                <button disabled={isDisable} type="submit" onClick={() => { setAction('Edit') }} className="flex items-center bg-emerald-600 text-white text-sm font-medium shadow rounded-md py-1.5 px-2">
                  <TfiPencil className="mr-1.5" />
                  Edit
                </button>
                <button disabled={isDisable} type="submit" onClick={() => { setAction('Remove') }} className="flex items-center bg-rose-500 text-white text-sm font-medium shadow rounded-md py-1.5 px-2">
                  <MdOutlineDeleteOutline className="mr-1.5 w-5 h-5" />
                  Remove
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex flex-col w-[48%]">
          <div className="max-h-[529px] overflow-y-auto flex flex-col bg-white p-5 shadow rounded-md">
            <div className="text-xl uppercase font-semibold text-cyan-600">
              Timeline
            </div>

            <ol className="mt-5 mx-8 px-4 relative border-l border-gray-200 dark:border-gray-700">
              {timeline.map((item, index) => {
                const formatToFe = formatToFE(item.deadline)
                const date = new Date(formatToFe).toString().split(' ')
                const format = date.slice(1, 4).join(' ')
                const check = new Date(formatToFe) < new Date()
                return (
                  <li onClick={() => {
                    formik.setFieldValue('stage', item.stage)
                    formik.setFieldValue('oldStage', item.stage)
                    formik.setFieldValue('note', item.note)
                    formik.setFieldValue('deadline', formatToFe)
                  }} key={index} className={`${index === timeline.length - 1 ? '' : 'mb-10'} ml-4 cursor-pointer`}>
                    <div className={`absolute w-3 h-3 ${check && Math.round(item.progress) === 1 ? 'bg-green-200' : 'bg-gray-200 '} rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700`}></div>

                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{format}</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.stage}
                      <span className={`ml-2 text-sm font-medium ${Math.round(item.progress) <= 0.2 ? 'text-rose-600' : Math.round(item.progress) <= 0.8 ? 'text-yellow-500' : 'text-green-500'}`}>{convertToPercentText(item.progress)}</span>
                    </h3>
                    <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{item.note}</p>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}

