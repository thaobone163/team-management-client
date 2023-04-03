import { useFormik } from 'formik'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineUserAdd } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { FcCancel, FcApproval } from 'react-icons/fc'

export default function Info({ data }) {
  const [email, setEmail] = useState('')
  const [isDisable, setIsDisable] = useState(true)

  const router = useRouter()
  const path = router.asPath

  useEffect(() => {
    const token = Cookies.get('token')
    const decoded = jwt_decode(token)
    setEmail(decoded.userEmail)
  })

  function toggleDisable() {
    setIsDisable(!isDisable)
  }

  function cancel() {
    setIsDisable(!isDisable)
    router.reload()
  }

  function addTeammate() {
    formik.setValues({
      ...formik.values,
      teammate: [
        ...formik.values.teammate,
        { email: '', role: '', confirm: null }
      ]
    });
  }

  function removeTeammate(index) {
    formik.setValues({
      ...formik.values,
      teammate: formik.values.teammate.filter((_, i) => i !== index)
    });
  }

  const formik = useFormik({
    initialValues: data,
    onSubmit: handleSubmit,
  })

  function handleSubmit(values) {
    values.user.email = email
    new Promise((r) => setTimeout(r, 500));
    let count = 0
    if (values.user.role === 'Leader') {
      count++
    }
    values.teammate.map(item => {
      if (item.role === 'Leader') {
        count++
      }
    })
    if (count === 0) {
      alert('Khong co leader kia!');
    }
    if (count > 1) {
      alert('Chi can 1 leader thoi')
    }
    alert(JSON.stringify(values, null, 2));
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <div className="font-medium text-teal-600">
            Project Name
          </div>
          <input id='project_name'
            disabled={isDisable}
            type='text'
            placeholder="Enter your project name"
            value={formik.values.project_name}
            onChange={formik.handleChange}
            required
            className={`${isDisable ? 'cursor-not-allowed' : ''} border border-sky-500 text-gray-900 text-sm rounded-md w-full py-3 px-7 focus:ring-0 focus:border-sky-500 shadow`}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="font-medium text-teal-600">
            Your Role
          </div>
          <div className="flex space-x-5 items-center">
            <input
              type={'email'}
              disabled={true}
              value={email}
              className="cursor-not-allowed border border-sky-500 text-gray-900 text-sm rounded-md w-full py-3 px-7 focus:ring-0 focus:border-sky-500 shadow"
            />
            <div className="flex items-center space-x-4 text-sm text-gray-700">
              <label className={`${isDisable ? 'cursor-not-allowed' : ''} flex items-center`}>
                <input
                  disabled={isDisable}
                  name='user.role'
                  type={'radio'}
                  value={'Member'}
                  checked={formik.values.user.role === 'Member'}
                  onChange={formik.handleChange}
                  required
                  className="mr-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-600"
                />
                Member
              </label>
              <label className={`${isDisable ? 'cursor-not-allowed' : ''} flex items-center`}>
                <input
                  disabled={isDisable}
                  name='user.role'
                  type={'radio'}
                  value={'Reviewer'}
                  checked={formik.values.user.role === 'Reviewer'}
                  onChange={formik.handleChange}
                  required
                  className="mr-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-600"
                />
                Reviewer
              </label>
              <label className={`${isDisable ? 'cursor-not-allowed' : ''} flex items-center`}>
                <input
                  disabled={isDisable}
                  name='user.role'
                  type={'radio'}
                  value={'Leader'}
                  checked={formik.values.user.role === 'Leader'}
                  onChange={formik.handleChange}
                  required
                  className="mr-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-600"
                />
                Leader
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 items-start">
          <div className="font-medium text-teal-600">
            Invite people to your project
          </div>
          {formik.values.teammate.map((item, index) => (
            <div key={index} className="flex space-x-5 items-center">
              <input
                disabled={item.confirm !== null}
                type={'email'}
                id={`teammate[${index}].email`}
                value={item.email}
                onChange={formik.handleChange}
                required
                placeholder={`Enter your teammates email address`}
                className={`border border-sky-500 text-gray-900 text-sm rounded-md py-3 px-7 focus:ring-0 focus:border-sky-500 shadow ${item.confirm !== null ? 'cursor-not-allowed' : ''}`}
              />
              <div className="flex items-center space-x-4 text-sm text-gray-700">
                <label className={`${isDisable ? 'cursor-not-allowed' : ''} flex items-center`}>
                  <input
                    disabled={isDisable}
                    type={'radio'}
                    name={`teammate[${index}].role`}
                    value={'Member'}
                    checked={item.role === 'Member'}
                    onChange={formik.handleChange}
                    required
                    className="mr-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-600"
                  />
                  Member
                </label>
                <label className={`${isDisable ? 'cursor-not-allowed' : ''} flex items-center`}>
                  <input
                    disabled={isDisable}
                    type={'radio'}
                    name={`teammate[${index}].role`}
                    value={'Reviewer'}
                    checked={item.role === 'Reviewer'}
                    onChange={formik.handleChange}
                    required
                    className="mr-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-600"
                  />
                  Reviewer
                </label>
                <label className={`${isDisable ? 'cursor-not-allowed' : ''} flex items-center`}>
                  <input
                    disabled={isDisable}
                    type={'radio'}
                    name={`teammate[${index}].role`}
                    value={'Leader'}
                    checked={item.role === 'Leader'}
                    onChange={formik.handleChange}
                    required
                    className="mr-1 w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-600"
                  />
                  Leader
                </label>
              </div>
              <button
                onClick={() => removeTeammate(index)}
                type='button'
                className='border shadow p-1.5 rounded'
              >
                <AiOutlineDelete className='w-6 h-6 text-rose-600' />
              </button>
              {
                item.confirm !== null ?
                  <div className='border shadow p-2 rounded text-sm text-gray-700'>
                    {item.confirm}
                  </div> : null
              }
            </div>
          ))
          }
          <button onClick={addTeammate} type='button' className='mt-3 flex items-center text-gray-800 shadow rounded py-1.5 px-3'>
            <AiOutlineUserAdd className='mr-2 w-5 h-5' />
            Add Member
          </button>
          <div className='flex text-sm text-thin text-gray-800 w-2/3'>
            Your teammates will receive an invitation to create a group in Projects Pending Approval.
          </div>
        </div>
        <div className='flex justify-end'>
          {
            path === '/project/new' ?
              <button type='submit' className=' bg-gradient-to-tr from-emerald-500 to-emerald-400 text-lg text-white font-bold rounded px-8 py-2'>
                Create
              </button> :
              isDisable ?
                <button onClick={toggleDisable} className='flex text-teal-700 bg-teal-50 font-bold rounded-md px-3 py-2 shadow-lg'>
                  <CiEdit className='w-6 h-6 mr-3' />
                  Edit
                </button> :
                <div className='flex space-x-5'>
                  <button type='submit' className='flex text-emerald-700 font-bold bg-emerald-50 rounded-md px-3 py-2 shadow-lg'>
                    <FcApproval className='w-6 h-6 mr-3' />
                    Save
                  </button>
                  <button onClick={cancel} className='flex text-rose-700 font-bold bg-rose-50 rounded-md px-3 py-2 shadow-lg'>
                    <FcCancel className='w-6 h-6 mr-3' />
                    Cancel
                  </button>
                </div>
          }
        </div>
      </form >
    </>
  )
}
