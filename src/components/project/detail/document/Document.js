import { useEffect, useState } from 'react'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { FcUpload } from 'react-icons/fc'
import NewFolder from './NewFolder'
import { getListFolder, uploadFile } from '@/util/mics'
import { useRouter } from 'next/router'
import Tree from './Tree'
import { useFormik } from 'formik'

export default function Document({ project_Info }) {
  const [listFolder, setListFolder] = useState([])
  const [parent, setParent] = useState(null)
  const [path, setPath] = useState('')
  const router = useRouter()

  useEffect(() => {
    getListFolder(project_Info.id).then((data) => {
      if (data.success) {
        setListFolder(data.data)
      }
    })
  }, [router.asPath])

  const upload = useFormik({
    initialValues: {
      file: null
    },
    onSubmit: handleUploadFile
  })

  const handleFileChange = (event, setFieldValue) => {
    setFieldValue('file', event.target.files[0]);
  };


  async function handleUploadFile(values) {
    await uploadFile(parent, values.file).then((data) => {
      console.log(data);
    })
  }

  return (
    <>
      <div className='flex flex-col space-y-5'>
        <div className="text-sm text-gray-600 flex">
          <div className={`pr-2 font-medium hover:text-sky-500`}>
            {project_Info.name}
          </div>
          &gt;
          <div className={`px-2 font-medium hover:text-sky-500`}>
            {path}
          </div>
        </div>
        <div className='flex space-x-5'>
          <button type='button' data-hs-overlay="#hs-focus-new-folder" className='flex items-center bg-sky-500 text-white text-sm font-semibold shadow rounded-lg p-2'>
            <AiOutlineFolderAdd className='mr-2 w-6 h-6' />
            New Folder
          </button>
          <form onSubmit={upload.handleSubmit} className='flex items-center bg-white text-emerald-600 text-sm font-semibold shadow rounded-lg py-2 pl-4'>
            <input type={'file'} id="file"
              className={`block w-fit text-sm bg-white focus:ring-0 focus:border-0 ${parent === null ? 'cursor-not-allowed' : null}`}
              multiple
              // value={upload.values.file}
              // onChange={upload.handleChange}
              onChange={(event) => handleFileChange(event, upload.setFieldValue)}
              disabled={parent === null}
            />
            <button type='submit'>
              <FcUpload className='w-5 h-5 mr-4' />
            </button>
          </form>
        </div>
        {
          listFolder.length === 0
            ? <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="/preview.png" alt="Image Description" />
            : <Tree listFolder={listFolder} setParent={setParent} path={{ path, setPath }} />
        }
      </div>
      <NewFolder fn={setListFolder} project={project_Info.id} parentFolder={parent} />
    </>
  )
}
