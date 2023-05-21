import Link from "next/link"
import { useState } from "react";
import { FcFolder, FcOpenedFolder, FcFile } from 'react-icons/fc'

export default function Read({ folder, list, setParent, path }) {
  return (
    <>
      <div className="pl-10 space-y-3">
        {
          list.get(folder._id) !== undefined
            ? list.get(folder._id).map(item => {
              const [show, setShow] = useState(true)
              return (
                <div key={item._id} className="flex flex-col border-t pt-2">
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
                            <Link href={item.url} className="border-t pt-2 pl-10 flex text-gray-700 items-center" key={item._id}>
                              <FcFile className={`w-8 h-8 mr-2`} />
                              {name[name.length - 1]}
                            </Link>
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
