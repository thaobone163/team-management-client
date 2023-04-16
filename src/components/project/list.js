import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useFilters, useGlobalFilter, useSortBy, useTable } from 'react-table'
import { FcCancel, FcApproval } from 'react-icons/fc'
import { CiFilter } from 'react-icons/ci'
import Link from 'next/link'
import { acceptInvitation, denyInvitation } from '@/util/mics'
import { useRouter } from 'next/router'

export default function List({ columns, data }) {
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

  function accept(id) {
    acceptInvitation(id, true).then((data) => {
      if (data.success) {
        router.push(`/project/${id}`)
      } else {
        alert(data.message)
      }
    })
  }

  function deny(id) {
    denyInvitation(id).then((res) => {
      if (res.success) {
        router.reload()
      } else {
        alert(res.message)
      }
    })
  }

  function search() {
    if (filterBy !== 'global') {
      setFilter(filterBy, filterValue)
    } else {
      setGlobalFilter(filterValue)
    }
  }

  return (
    <>
      <div className="w-[90%] pl-44 -mt-4 space-y-5 flex flex-col items-end">
        <div className='flex w-full justify-end items-center'>
          <div className='flex items-center border px-2 rounded-l-md shadow-md shadow-gray-100 text-gray-600'>
            <CiFilter className='w-5 h-5' />
            <select className='border-0 focus:ring-0' onChange={(e) => setFilterBy(e.target.value)}>
              <option value={'global'}>All</option>
              {headers.map(option => {
                if (option.Header !== 'Action' && option.Header !== 'Status' && option.Header !== 'Progress') {
                  return (
                    <option key={option.id} {...option.getHeaderProps()} value={option.id}>
                      {option.render('Header')}
                    </option>
                  )
                }
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
                console.log(row);
                prepareRow(row)
                return (
                  <tr key={row.id} {...row.getRowProps()} className="odd:bg-white border-b even:bg-gray-50">
                    {
                      row.cells.map(cell => {
                        if (cell.column.Header === 'Project') {
                          return (
                            <th key={Math.random()} {...cell.getCellProps()} scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                              <Link href={row.original.status === 'Pending' ? '' : `/project/${row.original.id}`}>
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
                              <button type={'button'} onClick={() => { accept(row.original.id) }}>
                                <FcApproval className='w-6 h-6' />
                              </button>
                              <button type={'button'} data-hs-overlay="#hs-vertically-centered-modal">
                                <FcCancel className='w-6 h-6' />
                              </button>
                              <div id="hs-vertically-centered-modal" class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                                <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
                                  <div class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
                                    <div class="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                                      <h3 class="font-bold text-gray-800 dark:text-white">
                                        Decline this invitation
                                      </h3>
                                      <button type="button" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                        <span class="sr-only">Close</span>
                                        <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                                        </svg>
                                      </button>
                                    </div>
                                    <div class="p-4 overflow-y-auto">
                                      <p class="text-gray-800 dark:text-gray-400">
                                        Can not undo! Are you sure decline this invitation?
                                      </p>
                                    </div>
                                    <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                                      <button type="button" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-vertically-centered-modal">
                                        Cancel
                                      </button>
                                      <button type='button' onClick={() => { deny(row.original.id) }} class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                                        Decline
                                      </button>
                                    </div>
                                  </div>
                                </div>
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
        <div className='text-sm text-gray-600 italic'>Count: {rows.length} projects</div>
      </div>
    </>
  )
}
