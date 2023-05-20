import { useEffect, useState } from 'react'
import { AiOutlineFolderAdd } from 'react-icons/ai'
import { FcUpload } from 'react-icons/fc'
import NewFolder from './NewFolder'
import { getListFolder } from '@/util/mics'
import { useRouter } from 'next/router'

export default function Document({project_Info}) {
  const [listFolder, setListFolder] = useState([])
  const [parent, setParent] = useState(null)
  const router = useRouter()

  console.log(listFolder);
  useEffect(() => {
    getListFolder(project_Info.id).then((data) => {
      if(data.success) {
        setListFolder(data.data)
      }
    })
  }, [router.asPath])

  return (
    <>
      <div className='flex flex-col space-y-5'>
        <div className="text-sm text-gray-600 flex">
          <div className={`pr-2 font-medium hover:text-sky-500`}>
            {project_Info.name}
          </div>
          &gt;
          <div className={`px-2 font-medium hover:text-sky-500`}>
            Path document
          </div>
        </div>
        <div className='flex space-x-5'>
          <button type='button' data-hs-overlay="#hs-focus-new-folder" className='flex items-center bg-sky-500 text-white text-sm font-semibold shadow rounded-lg p-2'>
            <AiOutlineFolderAdd className='mr-2 w-6 h-6' />
            New Folder
          </button>
          <button className='flex items-center bg-white text-emerald-600 text-sm font-semibold shadow rounded-lg p-2'>
            <FcUpload className='mr-2' />
            Upload file
          </button>
        </div>
        {
          listFolder.length === 0
            ? <img className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" src="/preview.png" alt="Image Description" />
            : <></>
        }
      </div>
      <NewFolder fn={setListFolder} project={project_Info.id} parentFolder={parent}/>
    </>
  )
}
