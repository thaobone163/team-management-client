import { useState } from "react"
import { BsSearch } from 'react-icons/bs'
import { CiFilter } from 'react-icons/ci'
import { useRouter } from "next/router";
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table'
import Link from 'next/link'

export default function ListTask({columns, data}) {
  const [filterBy, setFilterBy] = useState('global')
  const [filterValue, setFilterValue] = useState('')
  const router = useRouter()
  const tableInstance = useTable({ columns, data }, useFilters, useGlobalFilter, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    prepareRow,
    setFilter,
    setGlobalFilter
  } = tableInstance

  function search() {
    if (filterBy !== 'global') {
      setFilter(filterBy, filterValue)
    } else {
      setGlobalFilter(filterValue)
    }
  }

  return (
    <>
      <div className="space-y-5 flex flex-col items-end w-full">
        <div className='flex w-full justify-end items-center'>
          <div className='flex items-center border px-2 rounded-l-md shadow-md shadow-gray-100 text-gray-600'>
            <CiFilter className='w-5 h-5' />
            <select className='border-0 focus:ring-0' onChange={(e) => setFilterBy(e.target.value)}>
              <option value={'global'}>All</option>
              {headers.map(option => {
                return (
                  <option key={option.id} {...option.getHeaderProps()} value={option.id}>
                    {option.render('Header')}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='w-1/2 flex justify-between items-center border px-2 rounded-r-md shadow-md shadow-gray-100 text-gray-600'>
            <input type={"search"}
              placeholder="Find project"
              className='border-0 focus:ring-0 w-full'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  search()
                }
              }}
              onChange={(e) => { setFilterValue(e.target.value) }}
            />
            <button onClick={search} type='submit'>
              <BsSearch />
            </button>
          </div>
        </div>

        <div className='overflow-y-scroll overscroll-y-contain w-full h-[70%] rounded-md border shadow-lg shadow-gray-100'>
          <table className="w-full text-sm text-left text-gray-500" {...getTableProps}>
            <thead className="text-md font-medium text-gray-600 uppercase bg-gray-100 border-b">
              {headerGroups.map(headerGroup => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th key={column.id} scope="col" className="px-6 py-4" {...column.getHeaderProps(column.getSortByToggleProps())}>
                      <div className='flex' title='Hold Shift to multi sort'>
                        {column.render('Header')}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }} className="ai ai-ArrowDown"><path d="M12 20V4" /><path d="M5 13l7 7 7-7" /></svg>
                              : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 8 }} className="ai ai-ArrowUp"><path d="M12 20V4" /><path d="M5 11l7-7 7 7" /></svg>
                            : ''}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row)
                return (
                  <tr key={row.id} {...row.getRowProps()} className="odd:bg-white border-b even:bg-gray-50">
                    {
                      row.cells.map(cell => {
                        if (cell.column.Header === 'Title') {
                          return (
                            <th key={Math.random()} {...cell.getCellProps()} scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                              <Link href={`/task/${row.original.id}`}>
                                {cell.render('Cell')}
                              </Link>
                            </th>
                          )
                        } else if (cell.column.Header === 'Status') {
                          return (
                            <td key={Math.random()} {...cell.getCellProps()} className="px-5">
                              <div className={`w-fit ${cell.value === 'Todo' ? 'bg-rose-400' : cell.value === 'Doing' ? 'bg-sky-400' : cell.value === 'Done' ? 'bg-green-400' : 'bg-yellow-400'} text-white text-sm py-1 px-1.5 font-semibold rounded-md shadow`}
                              >
                                {cell.render('Cell')}
                              </div>
                            </td>
                          )
                        }
                        return (
                          <td key={Math.random()} {...cell.getCellProps()} className="px-6 py-4">
                            {cell.render('Cell')}
                          </td>
                        )
                      })
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='text-sm text-gray-600 italic'>Count: {rows.length} tasks</div>
      </div>
    </>
  )
}
