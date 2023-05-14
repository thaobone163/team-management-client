import { capitalizeFirstLetter, formatDate, formatToFE } from "@/util/common";
import { updateFieldTask } from "@/util/mics";
import { useFormik } from "formik";
import { useState } from "react";
import Assign from "./Assign";
import { TiDelete } from 'react-icons/ti'

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

export default function EditField({ taskId, taskInfo, projectInfo, detail, field }) {
  const [isDisable, setIsDisable] = useState(true)

  const validate = values => {
    const errors = {};
    if ((field === 'estimate' || field === 'spend') && !/^ *([0-9]+(mo|month|months))? *([0-9]+(w|week|weeks))? *([0-9]+(d|day|days))? *([0-9]+(h|hour|hours))? *([0-9]+(m|minute|minutes))? *$/i.test(values.field)) {
      errors.field = `Invalid ${field} time`;
    }

    return errors;
  };

  const formField = useFormik({
    initialValues: {
      field: field === 'duedate' ? formatToFE(taskInfo[field]) : taskInfo[field],
    },
    onSubmit: updateField,
    validate,
    onReset: resetField
  });

  function resetField() {
    formField.setValues({ ...formField.values, field: detail.detail[field] })
    setIsDisable(true)
  }

  async function updateField(values) {
    const json = { [field]: values.field }
    await updateFieldTask(taskId, json).then((data) => {
      if (data.success) {
        detail.setDetail({ ...detail.detail, [field]: data.task[field], updates: data.task.updates })
        setIsDisable(true)
      } else {
        alert(data.message)
      }
    })
  }

  return (
    <>
      <form className="w-full text-gray-600 pt-3" onSubmit={formField.handleSubmit} onReset={formField.handleReset}>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between items-end">
            <label htmlFor='field' className="font-semibold">{capitalizeFirstLetter(field)}</label>
            <div onClick={() => { setIsDisable(false) }} className="border px-2 py-0.5 rounded-md shadow cursor-pointer" >
              Edit
            </div>
          </div>
          {
            field === 'description'
              ? <>
                {
                  isDisable
                    ? detail.detail[field]
                    : <textarea type="text"
                      id="field"
                      rows={3}
                      value={formField.values.field}
                      onChange={formField.handleChange}
                      className="border border-sky-300 shadow rounded-lg focus:border-sky-300"
                    />
                }
              </>
              : field === 'stage'
                ? <>
                  {
                    isDisable
                      ? detail.detail[field]
                      : <select
                        id="field"
                        className="border border-sky-300 shadow rounded-lg focus:border-sky-300"
                        value={formField.values.field}
                        onChange={formField.handleChange}
                        required
                      >
                        <option value={''}>Select stage</option>
                        {projectInfo.timeline.map((item) => (
                          <option key={item.stage} value={item.stage}>
                            {item.stage}
                          </option>
                        ))}
                      </select>
                  }
                </>
                : field === 'status'
                  ? <>
                    {
                      isDisable
                        ? <span className={`w-fit ${detail.detail.status === 'Todo' ? 'bg-rose-400' : detail.detail.status === 'Doing' ? 'bg-sky-400' : detail.detail.status === 'Done' ? 'bg-green-400' : 'bg-yellow-400'} text-white text-sm py-1 px-1.5 font-semibold rounded-md shadow`}>{detail.detail.status}</span>
                        : <select
                          id='field'
                          className="border border-sky-300 shadow rounded-lg focus:border-sky-300"
                          value={formField.values.field}
                          onChange={formField.handleChange}
                          required
                        >
                          <option value={''}>Select status</option>
                          <option value={'Todo'}>Todo</option>
                          <option value={'Doing'}>Doing</option>
                          <option value={'Review'}>Review</option>
                          <option value={'Done'}>Done</option>
                        </select>
                    }
                  </>
                  : field === 'assign'
                    ? <>
                      {
                        isDisable
                          ?
                          <Assign email={detail.detail.assign} />
                          : <select
                            id='field'
                            className="border border-sky-300 shadow rounded-lg focus:border-sky-300"
                            value={formField.values.field}
                            onChange={formField.handleChange}
                            required
                          >
                            <option value={''}>Select member</option>
                            <option value={projectInfo.user.email}>{`${projectInfo.user.name} (${projectInfo.user.email})`}</option>
                            {projectInfo.teammate.map((member) => (
                              <option key={member.email} value={member.email}>
                                {`${member.detail.full_name} (${member.email})`}
                              </option>
                            ))}
                          </select>
                      }
                    </>
                    : field === 'tags'
                      ? <>
                        {
                          isDisable
                            ?
                            <div className="flex flex-wrap">
                              {detail.detail.tags.map((tag, index) => (
                                <div key={index} className={`text-xs max-w-[90%] whitespace-nowrap mr-2 my-1 ${colorTag.get(index)} text-white p-1 rounded font-semibold`}>
                                  {tag}
                                </div>
                              ))}
                            </div>
                            : <div className="shadow flex flex-wrap items-center text-sm border border-sky-500 rounded-lg py-3 pl-4 pr-3 focus:ring-0 focus:border-sky-500">
                              {formField.values.field.map((tag, index) => (
                                <div key={index} className="flex mr-2 my-1 rounded-md border p-1 max-w-[90%]">
                                  <span className="max-w-[90%] break-words">
                                    {tag}
                                  </span>
                                  <TiDelete onClick={() => {
                                    formField.setFieldValue('field', formField.values.field.filter((_, i) => i != index))
                                  }}
                                    className="w-4 h-4 ml-1 text-gray-600 stroke-black" />
                                </div>
                              ))}
                              <input type='text'
                                id='field'
                                className='my-1 text-xs p-1.5 text-gray-900 focus:ring-0 border border-gray-200 focus:border-gray-200 rounded-md'
                                placeholder="ex: #tag..."
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    formField.setFieldValue('field', [...formField.values.field, e.target.value])
                                    e.target.value = ''
                                    e.preventDefault()
                                  }
                                }}
                              />
                            </div>
                        }
                      </>
                      : field === 'duedate'
                        ? <>
                          {isDisable
                            ? formatDate(detail.detail[field])
                            : <input type={'date'}
                              id='field'
                              value={formField.values.field}
                              onChange={formField.handleChange}
                              className="border border-sky-300 shadow rounded-lg focus:border-sky-300"
                              required
                            />}
                        </>
                        : <>
                          {isDisable
                            ? detail.detail[field]
                            : <input type="text"
                              id='field'
                              value={formField.values.field}
                              onChange={formField.handleChange}
                              className="border border-sky-300 shadow rounded-lg focus:border-sky-300"
                              required={field === 'title' || field === 'estimate'}
                            />}
                        </>
          }
        </div>
        {
          formField.errors.field
            ? <span className="text-xs text-rose-500 font-semibold flex justify-end pt-2">{formField.errors.field}</span>
            : null
        }
        <div className="flex justify-end mt-2 text-sm">
          {
            isDisable
              ? null
              : <>
                <button type="submit" className="bg-green-400 text-white font-medium rounded-md py-1 px-3 mr-5 shadow">Save Changes</button>
                <button type='reset' className="border border-gray-400 rounded-md py-1 px-3 shadow">Cancel</button>
              </>
          }
        </div>
      </form>
    </>
  )
}
