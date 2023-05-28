import { useSortBy, useTable } from "react-table"
import { identicon } from 'minidenticons'
import { SlPencil } from 'react-icons/sl'
import EditReview from "./EditReview"
import AddReview from "./AddReview"

export default function Table({ columns, data, role, projectId, fn }) {
  const tableInstance = useTable({ columns, data }, useSortBy)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    prepareRow
  } = tableInstance

  return (
    <>
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
                <tr key={row.id} {...row.getRowProps()} className="odd:bg-white border-b">
                  {
                    row.cells.map(cell => {
                      if (cell.column.Header === 'Project') {
                        return (
                          <th key={Math.random()} {...cell.getCellProps()} scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                            {cell.render('Cell')}
                          </th>
                        )
                      } else if (cell.column.Header === 'Member') {
                        return (
                          <th key={Math.random()} {...cell.getCellProps()} scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">
                            <div className="flex items-center space-x-2" >
                              <img src={
                                'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(cell.value.email.replace('@', '')))
                              }
                                alt={cell.value.name}
                                className="w-8 h-8 border-2 shadow rounded-full" />
                              <div className="flex flex-col text-sm text-gray-700">
                                {cell.value.name}
                                <span className="text-gray-500 text-xs truncate max-w-[100px] ">{cell.value.email}</span>
                                <span className={cell.value.role === 'Member' ? "mt-1 px-1.5 py-0.5 w-fit bg-emerald-300 text-xs text-white font-semibold rounded-lg" :
                                  cell.value.role === 'Leader' ? "mt-1 px-1.5 py-0.5 w-fit bg-amber-200 text-xs text-amber-600 font-semibold rounded-lg" :
                                    "mt-1 px-1.5 py-0.5 w-fit bg-lime-300 text-xs text-lime-600 font-semibold rounded-lg"}>{cell.value.role}</span>
                              </div>
                            </div>
                          </th>
                        )
                      } else if (cell.column.Header === 'Reviewer') {
                        return (
                          <td key={Math.random()} {...cell.getCellProps()} className="px-5">
                            {
                              row.original.isReviewed
                                ? <div className="flex items-center space-x-2" >
                                  <img src={
                                    'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(cell.value.email.replace('@', '')))
                                  }
                                    alt={cell.value.name}
                                    className="w-8 h-8 border-2 shadow rounded-full" />
                                  <div className="flex flex-col text-sm text-gray-700">
                                    {cell.value.name}
                                    <span className="text-gray-500 text-xs truncate max-w-[100px]">{cell.value.email}</span>
                                  </div>
                                </div>
                                : <>[Not reviewed yet]</>
                            }
                          </td>
                        )
                      } else if (cell.column.Header === 'Option') {
                        return (
                          <td key={Math.random()} {...cell.getCellProps()} className="px-5">
                            <div className="flex items-center space-x-2" >
                              <button disabled={role !== 'Reviewer'} data-hs-overlay={`#hs-focus-edit-${row.original.id}`} className={`flex items-center bg-green-400 text-white font-medium rounded shadow px-2 py-1 ${role !== 'Reviewer' ? 'cursor-not-allowed' : ''} `}>
                                <SlPencil className="mr-2" />
                                Edit
                              </button>
                              <div id={`hs-focus-edit-${row.original.id}`} className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                                <EditReview data={row.original} fn={fn}/>
                              </div>
                              {
                                !row.original.isReviewed
                                  ? <>
                                    <button disabled={role !== 'Reviewer'} data-hs-overlay={`#hs-focus-review-${row.original.id}`} className={`flex items-center bg-sky-400 text-white font-medium rounded shadow px-2 py-1 ${role !== 'Reviewer' ? 'cursor-not-allowed' : ''}`}>
                                      Review
                                    </button>
                                    <div id={`hs-focus-review-${row.original.id}`} className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                                      <AddReview data={row.original} projectId={projectId} fn={fn}/>
                                    </div>
                                  </>
                                  : null
                              }
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
    </>
  )
}
