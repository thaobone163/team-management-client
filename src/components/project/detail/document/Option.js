import {AiOutlineDelete} from 'react-icons/ai'
import {SlPencil} from 'react-icons/sl'

export default function ({type, select}) {
  console.log(type, select);
  return (
    <>
    <div className='flex space-x-3 text-gray-700 ml-5'>
      <button>
        <SlPencil className='w-4 h-4'/>
      </button>
      <button>
        <AiOutlineDelete className='w-5 h-5'/>
      </button>
    </div>
    </>
  )
}
