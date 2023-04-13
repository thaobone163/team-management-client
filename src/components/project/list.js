import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { useSortBy, useTable } from 'react-table'
import { FcCancel, FcApproval } from 'react-icons/fc'
import { CiFilter } from 'react-icons/ci'
import Link from 'next/link'

export default function List({ columns, data }) {
  const tableInstance = useTable({ columns, data }, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <>
      <div className="w-[90%] pl-44 -mt-4 space-y-5 flex flex-col items-end">
        <div className='flex w-full justify-end items-center'>
          <div className='flex items-center border px-2 rounded-l-md shadow-md shadow-gray-100 text-gray-600'>
            <CiFilter className='w-5 h-5' />
            <select className='border-0 focus:ring-0'>
              <option>All</option>
              {headers.map(option => {
                if (option.Header !== 'Action') {
                  return (
                    <option key={option.id} {...option.getHeaderProps()}>
                      {option.render('Header')}
                    </option>
                  )
                }
              })}
            </select>
          </div>
          <div className='w-1/2 flex justify-between items-center border px-2 rounded-r-md shadow-md shadow-gray-100 text-gray-600'>
            <input type={"text"}
              placeholder="Find project"
              className='border-0 focus:ring-0 '
            />
            <button type='submit'>
              <BsSearch />
            </button>
          </div>
        </div>

        <div className='overflow-y-scroll overscroll-y-contain w-full h-[65%] rounded-md border shadow-lg shadow-gray-100'>
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
                        if (cell.column.Header === 'Project') {
                          return (
                            <th key={Math.random()} {...cell.getCellProps()} scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                              <Link href={`/project/${row.original.id}`}>
                                {cell.render('Cell')}
                              </Link>
                            </th>
                          )
                        } else if (cell.column.Header === 'Role') {
                          return (
                            <td key={Math.random()} {...cell.getCellProps()} className="px-5">
                              <div className={cell.value === 'Member' ? "p-1.5 w-fit bg-emerald-300 text-white font-semibold rounded-lg" :
                                cell.value === 'Leader' ? "p-1.5 w-fit bg-amber-200 text-amber-600 font-semibold rounded-lg" :
                                  "p-1.5 w-fit bg-lime-300 text-lime-600 font-semibold rounded-lg"}
                              >
                                {cell.render('Cell')}
                              </div>
                            </td>
                          )
                        } else if (cell.column.Header === 'Progress') {
                          const value = cell.value
                          const convert = Math.round(value * 100) + '%'
                          return (
                            <td key={Math.random()} {...cell.getCellProps()} className="px-6 py-4 flex items-center font-medium">
                              <div className={`w-full bg-${value >= 0.8 ? 'green' : value >= 0.5 ? 'yellow' : 'red'}-100 rounded-full h-2 mr-3`}>
                                <div className={`bg-${value >= 0.8 ? 'green-400' : (value >= 0.5 ? 'yellow-400' : 'red-400')} h-2 rounded-full`}
                                  style={{ width: convert }}></div>
                              </div>
                              {convert}
                            </td>
                          )
                        } else if (cell.column.Header === 'Action') {
                          return (
                            <td key={Math.random()} {...cell.getCellProps()} className="px-6 py-4 space-x-5">
                              <button>
                                <FcApproval className='w-6 h-6' />
                              </button>
                              <button>
                                <FcCancel className='w-6 h-6' />
                              </button>
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
        <div className='text-sm text-gray-600 italic'>Count: {rows.length} projects</div>
      </div>
    </>
  )
}
