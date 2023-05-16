import { createTask, getUserByEmail } from "@/util/mics";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { TiDelete } from 'react-icons/ti'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { formatToBE } from "@/util/common";

export default function AddTask({ project_id, project_name, user, other_member, timeline, fn }) {
  const [creator, setCreator] = useState('')
  const [result, setResult] = useState({ isHidden: true, success: '', message: '' })

  useEffect(() => {
    getUserByEmail(user.email).then((data) => {
      if (data.success) {
        setCreator(data.full_name)
      }
    })
  }, [])

  const validate = values => {
    const errors = {};
    if (!/^ *([0-9]+(mo|month|months))? *([0-9]+(w|week|weeks))? *([0-9]+(d|day|days))? *([0-9]+(h|hour|hours))? *([0-9]+(m|minute|minutes))? *$/i.test(values.estimate)) {
      errors.estimate = 'Invalid estimated time';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      project: project_id,
      description: '',
      stage: '',
      assign: '',
      duedate: '',
      estimate: '',
      tags: []
    },
    onSubmit: handleAdd,
    onReset: reset,
    validate
  });

  function reset() {
    setResult({ isHidden: true })
    formik.setValues({
      title: '',
      project: project_id,
      description: '',
      stage: '',
      assign: '',
      duedate: '',
      estimate: '',
      tags: []
    }
    )
  }

  async function handleAdd(values, actions) {
    const duedate = formatToBE(values.duedate)
    createTask(values.stage, values.title, values.project, values.description, values.assign, duedate, values.estimate, values.tags).then((data) => {
      if (data.success) {
        actions.resetForm({
          values: {
            title: '',
            project: project_id,
            description: '',
            stage: '',
            assign: '',
            duedate: '',
            estimate: '',
            tags: []
          }
        })
        fn()

      }
      setResult({
        isHidden: false,
        success: data.success,
        message: data.message
      })
    })
  }

  return (
    <>
      <div hidden={result.isHidden} id="dismiss-alert" className={`hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 border m-auto ${result.success ? 'bg-teal-50 border-teal-200' : 'bg-rose-50 border-rose-200'} rounded-md p-4`} role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className={`h-4 w-4 ${result.success ? 'text-teal-400' : 'text-rose-400'} mt-0.5`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <div className="ml-3">
            <div className={`text-sm ${result.success ? 'text-teal-800' : 'text-rose-800'} font-medium`}>
              {result.message}
            </div>
          </div>
          <div className="pl-3 ml-auto">
            <div className="-mx-1.5 -my-1.5">
              <button onClick={() => {
                const hidden = result.isHidden
                setResult({
                  isHidden: !hidden
                })
              }}
                type="button" className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${result.success ? 'bg-teal-50 text-teal-500 hover:bg-teal-100  focus:ring-offset-teal-50 focus:ring-teal-600' : 'bg-rose-50 text-rose-500 hover:bg-rose-100  focus:ring-offset-rose-50 focus:ring-rose-600'}`}>
                <span className="sr-only">Dismiss</span>
                <svg className="h-3 w-3" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-teal-500 text-lg dark:text-white">
              Add New Task
            </h3>
            <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-focus-add-task-modal">
              <span className="sr-only">Close</span>
              <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
              </svg>
            </button>
          </div>
          <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
            <div className="p-5 space-y-4 h-[450px] overflow-y-auto">
              <div className="flex justify-between">
                <div className="relative">
                  <label htmlFor='project'
                    className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                    Project
                  </label>
                  <input type='text'
                    id='project'
                    className='w-fit shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg py-3 pl-4 pr-3 focus:ring-0 focus:border-sky-500'
                    value={project_name}
                    disabled
                  />
                </div>
                <div className="relative">
                  <label htmlFor='creator'
                    className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                    Creator
                  </label>
                  <input type='text'
                    id='creator'
                    className=' w-52 shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg py-3 pl-4 pr-4 focus:ring-0 focus:border-sky-500'
                    value={creator}
                    disabled
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor='title'
                  className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                  Title
                </label>
                <input type='text'
                  id='title'
                  className='shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-3 px-4 focus:ring-0 focus:border-sky-500'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  placeholder="ex: First Task"
                  required
                  autoFocus
                />
              </div>
              <div className="relative">
                <label htmlFor='description'
                  className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                  Description
                </label>
                <textarea type='text'
                  rows={3}
                  id='description'
                  className='shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-3 px-4 focus:ring-0 focus:border-sky-500'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  placeholder="ex: Description ..."
                />
              </div>
              <div className="pt-1 relative">
                <label htmlFor='tags'
                  className='absolute -mt-3 ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                  Tags
                </label>
                <div className="shadow flex flex-wrap items-center text-sm border border-sky-500 rounded-lg py-3 pl-4 pr-3 focus:ring-0 focus:border-sky-500">
                  {formik.values.tags.map((tag, index) => (
                    <div key={index} className="flex mr-2 my-1 rounded-md border p-1 w-full">
                      <span className="max-w-[90%] break-words">
                        {tag}
                      </span>
                      <TiDelete onClick={() => {
                        formik.setFieldValue('tags', formik.values.tags.filter((_, i) => i != index))
                      }}
                        className="w-4 h-4 ml-1 text-gray-600 stroke-black" />
                    </div>
                  ))}
                  <input type='text'
                    id='tags'
                    className='my-1 text-xs p-1.5 text-gray-900 focus:ring-0 border border-gray-200 focus:border-gray-200 rounded-md'
                    placeholder="ex: #tag..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        formik.setFieldValue('tags', [...formik.values.tags, e.target.value])
                        e.target.value = ''
                        e.preventDefault()
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="relative w-[30%]">
                  <label htmlFor='stage'
                    className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                    Stage
                  </label>
                  <select
                    id='stage'
                    className='shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-3 px-4 focus:ring-0 focus:border-sky-500'
                    value={formik.values.stage}
                    onChange={formik.handleChange}
                    required
                  >
                    <option value={''}>Select stage</option>
                    {timeline.map((item) => (
                      <option key={item.stage} value={item.stage}>
                        {item.stage}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative w-[66.5%]">
                  <label htmlFor='assign'
                    className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                    Assign
                  </label>
                  <select
                    id='assign'
                    required
                    className='shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg w-full py-3 px-4 focus:ring-0 focus:border-sky-500'
                    value={formik.values.assign}
                    onChange={formik.handleChange}
                  >
                    <option value={''}>Select member</option>
                    <option value={user.email}                  >
                      {creator} ({user.email})
                    </option>
                    {other_member.map((member) => (
                      <option key={member.email} value={member.email}>
                        {member.detail.full_name} ({member.email})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="relative">
                  <label htmlFor='duedate'
                    className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                    Duedate
                  </label>
                  <input type={'date'}
                    id='duedate'
                    className='shadow mt-3 border border-sky-500 text-gray-900 text-sm rounded-lg py-3 pl-4 pr-3 focus:ring-0 focus:border-sky-500'
                    value={formik.values.duedate}
                    onChange={formik.handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <label htmlFor='estimate'
                    className='absolute ml-2.5 px-2 bg-white text-md font-medium text-sky-500'>
                    Estimate
                  </label>
                  <div className="mt-3 flex items-center">
                    <input type='text'
                      id='estimate'
                      className=' w-[284px] shadow border border-sky-500 text-gray-900 text-sm rounded-lg py-3 pl-4 pr-12 focus:ring-0 focus:border-sky-500'
                      placeholder="ex: 1h 30m"
                      value={formik.values.estimate}
                      onChange={formik.handleChange}
                      required
                    />
                    <div className="hs-tooltip inline-block [--trigger:hover] [--placement:top] relative">
                      <AiOutlineFieldTime className="-ml-10 hs-tooltip-toggle block text-center w-6 h-6 text-gray-600" />
                      <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity absolute hidden invisible z-10 py-3 px-4 bg-white border text-sm text-gray-600 rounded-md max-w-sm shadow-md dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400" role="tooltip">
                        <span className="pt-3 px-4 block text-md font-semibold text-gray-600 dark:text-white">Available time units</span>
                        <hr />
                        <table className="mt-3 mx-2">
                          <thead>
                            <tr className="text-sm text-gray-600 font-normal bg-slate-200 border-b">
                              <th scope="col" className="px-6 py-3 text-left">Unit</th>
                              <th scope="col" className="px-6 py-3 text-left">Type</th>
                              <th scope="col" className="px-6 py-3 text-left">Conversion</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-xs text-gray-600 text-center border-b">
                              <td scope="col" className="py-3">Month</td>
                              <td scope="col" className="py-3">
                                <span className='italic bg-slate-100 px-1 rounded'>mo</span>, <span className='italic bg-slate-100 px-1 rounded'>month</span> or <span className='italic bg-slate-100 px-1 rounded'>months</span></td>
                              <td scope="col" className="py-3">4w (224h)</td>
                            </tr>
                            <tr className="text-xs text-gray-600 text-center border-b">
                              <td scope="col" className="py-3">Week</td>
                              <td scope="col" className="py-3">
                                <span className='italic bg-slate-100 px-1 rounded'>w</span>, <span className='italic bg-slate-100 px-1 rounded'>week</span> or <span className='italic bg-slate-100 px-1 rounded'>weeks</span></td>
                              <td scope="col" className="py-3">7d (56h)</td>
                            </tr>
                            <tr className="text-xs text-gray-600 text-center border-b">
                              <td scope="col" className="py-3">Day</td>
                              <td scope="col" className="py-3">
                                <span className='italic bg-slate-100 px-1 rounded'>d</span>, <span className='italic bg-slate-100 px-1 rounded'>day</span> or <span className='italic bg-slate-100 px-1 rounded'>days</span></td>
                              <td scope="col" className="py-3">8h</td>
                            </tr>
                            <tr className="text-xs text-gray-600 text-center border-b">
                              <td scope="col" className="py-3">Hour</td>
                              <td scope="col" className="py-3">
                                <span className='italic bg-slate-100 px-1 rounded'>h</span>, <span className='italic bg-slate-100 px-1 rounded'>hour</span> or <span className='italic bg-slate-100 px-1 rounded'>hours</span></td>
                              <td scope="col" className="py-3">60m</td>
                            </tr>
                            <tr className="text-xs text-gray-600 text-center border-b">
                              <td scope="col" className="py-3">Minute</td>
                              <td scope="col" className="py-3">
                                <span className='italic bg-slate-100 px-1 rounded'>m</span>, <span className='italic bg-slate-100 px-1 rounded'>minute</span> or <span className='italic bg-slate-100 px-1 rounded'>minutes</span></td>
                              <td scope="col" className="py-3"></td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="px-2 py-3 font-normal text-xs text-gray-600">
                          The data needs to be arranged in the correct order (mo - m). Ex: 1mo 2w 3d 4h 5m
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-rose-500 flex justify-end items-start">
                {formik.errors.estimate}
              </div>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button type="reset" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-focus-add-task-modal">
                Close
              </button>
              <button type="submit" data-hs-overlay="#hs-focus-add-task-modal" className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                Save changes
              </button>
            </div>
          </form>
        </div >
      </div >
    </>
  )
}
