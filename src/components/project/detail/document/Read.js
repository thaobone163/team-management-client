import Link from "next/link"
import { useState } from "react";
import { FcFolder, FcOpenedFolder, FcFile } from 'react-icons/fc'

export default function Read({ folder, list, setParent, path }) {
  const [show, setShow] = useState({ status: false, folder: null })

  return (
    <>
      <div className="pl-10 space-y-3">
        {
          list.get(folder._id) !== undefined
            ? list.get(folder._id).map(item => {
              return (
                <div key={item._id} className="flex flex-col border-t pt-2">
                  <div data-hs-collapse={`#hs-basic-collapse-folder-${item._id}`}
                    className={`hs-collapse-toggle flex items-center justify-between text-md text-gray-700 cursor-pointer`}
                    id={`hs-basic-collapse-${item._id}`}
                    onClick={() => {
                      setParent(item._id)
                      path.setPath(item.path.replace('/', ' > '))
                      setShow({
                        status: !show.status,
                        folder: item._id
                      })
                    }}>
                    <div className="flex items-center">
                      {
                        show.status && show.folder === item._id
                          ? <FcOpenedFolder className={`w-9 h-9 mr-2`} />
                          : <FcFolder className={`w-9 h-9 mr-2`} />
                      }
                      {item.name}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm italic">
                      {item.createdAt}
                      <div className={`${path.path === item.path.replace('/', ' > ') ? 'bg-emerald-500' : 'bg-white'} ml-5 w-3 h-3 rounded-full`}></div>
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
                            <div key={item._id} className='flex items-center justify-between border-t pt-2'>
                              <Link href={item.url} className="pl-10 flex text-gray-700 items-center" target='_blank' >
                                <FcFile className={`w-8 h-8 mr-2`} />
                                {name[name.length - 1]}
                              </Link>
                              <div className='flex items-center text-sm italic text-gray-600 mr-8'>
                                Created by {item.author}
                              </div>
                            </div>
                          )
                        })
                        : null
                    }
                    <Read folder={item} list={list} setParent={setParent} path={path} />
                  </div>
                </div>
              )
            })
            : null
        }
      </div>
    </>
  )
}
