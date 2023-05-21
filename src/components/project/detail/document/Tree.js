import { FcFolder, FcOpenedFolder, FcFile } from 'react-icons/fc'
import Read from "./Read"
import { useState } from 'react'
import Link from 'next/link'

export default function Tree({ listFolder, setParent, path }) {
  const list = new Map()
  listFolder.map((item) => {
    const child = new Set(list.get(item.parentFolder)).add(item)
    list.set(item.parentFolder, Array.from(child))
  })
  return (
    <>
      <div className="flex flex-col px-10 py-5 space-y-3 bg-white rounded-lg shadow">
        {
          list.get(null).map(item => {
            const [show, setShow] = useState(true)
            return (
              <div key={item._id} className='border-b pb-2'>
                <div data-hs-collapse={`#hs-basic-collapse-folder-${item._id}`}
                  className={`hs-collapse-toggle flex items-center justify-between text-md text-gray-700 cursor-pointer`}
                  id={`hs-basic-collapse-${item._id}`}
                  onClick={() => {
                    setParent(item._id)
                    path.setPath(item.path.replace('/', ' > '))
                    setShow(!show)
                  }}>
                  <div className="flex items-center">
                    {
                      show
                        ? <FcFolder className={`w-9 h-9 mr-2`} />
                        : <FcOpenedFolder className={`w-9 h-9 mr-2`} />
                    }
                    {item.name}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm italic">
                    {item.createdAt}
                    <div className={`${path.path === item.path ? 'bg-emerald-500' : 'bg-white'} ml-5 w-3 h-3 rounded-full`}></div>
                  </div>
                </div>
                <div id={`hs-basic-collapse-folder-${item._id}`}
                  className="hs-collapse hidden w-full overflow-hidden transition-[height] duration-300 space-y-3 pt-3"
                  aria-labelledby={`hs-basic-collapse-${item._id}`}>
                  {
                    item.items !== undefined
                      ? item.items.map(item => {
                        const name = item.url.split('-')
                        return (
                          <>
                            <div className='flex items-center justify-between'>
                              <Link href={item.url} className="border-t pt-2 pl-10 flex text-gray-700 items-center" key={item._id} target='_blank' >
                                <FcFile className={`w-8 h-8 mr-2`} />
                                {name[name.length - 1]}
                              </Link>
                              <div className='flex items-center text-sm italic text-gray-600 mr-8'>
                                Created by {item.author}
                              </div>
                            </div>
                          </>
                        )
                      })
                      : null
                  }
                  <Read folder={item} list={list} setParent={setParent} path={path} />
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}
