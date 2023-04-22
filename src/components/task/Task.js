import React, { useEffect, useState } from "react";
import Board from "./Board";
import { CiFilter } from 'react-icons/ci'
import { BsSearch } from 'react-icons/bs'

const initialLists = [
  {
    title: "To Do",
    status: "todo",
  },
  {
    title: "Doing",
    status: "doing",
  },
  {
    title: "Review",
    status: "review",
  },
  {
    title: "Done",
    status: "done",
  },
];

const initialData = {
  todo: [
    {
      id: "qwe1",
      title: "Card 1",
      project: 'Team 7 - INT3906 1',
      description: 'This is description for task 1',
      assign: 'Thao Bone',
      duedate: '17/02/2023',
      estimate: '4 Hours',
      spend: '',
      status: "todo",
      order: 1,
      tags: ['#tag_1', '#tag_2'],
    },
    {
      id: "qwe3",
      title: "Card 3",
      project: 'Team 7 - INT3906 1',
      description: 'This is description for task 3',
      assign: 'Khai Ca',
      duedate: '17/02/2023',
      estimate: '4 Hours',
      spend: '',
      status: "todo",
      order: 2,
      tags: ['#tag_3'],
    },
    {
      id: "qwe5",
      title: "Card 5",
      project: 'Team 7 - INT3906 1',
      description: 'This is description for task 5',
      assign: 'Thao Bone',
      duedate: '17/02/2023',
      estimate: '4 Hours',
      spend: '',
      status: "todo",
      order: 3,
      tags: ['#tag_1', '#tag_3'],
    },
  ],
  doing: [
    {
      id: "qwe2",
      title: "Card 2",
      project: 'Team 7 - INT3906 1',
      description: 'This is description for task 2',
      assign: 'Ngoc Minh',
      duedate: '17/02/2023',
      estimate: '4 Hours',
      spend: '3 Hours',
      status: "doing",
      order: 1,
      tags: ['#tag_2'],
    },
  ],
  done: [
    {
      id: "qwe4",
      title: "Card 4",
      project: 'Team 7 - INT3906 1',
      description: 'This is description for task 4',
      assign: 'Thao Bone',
      duedate: '17/02/2023',
      estimate: '4 Hours',
      spend: '4 Hours',
      status: "done",
      order: 1,
      tags: ['#tag_2', '#tag_3'],
    },
  ],
  review: [
    {
      id: "qwe6",
      title: "Card 6",
      project: 'Team 7 - INT3906 1',
      description: 'This is description for task 6',
      assign: 'Thao Bone',
      duedate: '17/02/2023',
      estimate: '4 Hours',
      spend: '5 Hours',
      status: "review",
      order: 1,
      tags: ['#tag_2', '#tag_3'],
    },
  ]
};

const allTags = new Map()
initialData.todo.forEach((item) => {
  item.tags.forEach((tag) => {
    allTags.set(tag, '')
  })
})
initialData.doing.forEach((item) => {
  item.tags.forEach((tag) => {
    allTags.set(tag, '')
  })
})
initialData.done.forEach((item) => {
  item.tags.forEach((tag) => {
    allTags.set(tag, '')
  })
})
initialData.review.forEach((item) => {
  item.tags.forEach((tag) => {
    allTags.set(tag, '')
  })
})

export default function Task() {
  const [filterBy, setFilterBy] = useState('all')
  const [filterValue, setFilterValue] = useState('')
  const [lists, setLists] = useState(initialLists);
  const [data, setData] = useState(initialData);
  const [dataFilter, setDatafilter] = useState({ todo: [], doing: [], review: [], done: [] })

  // Handle Lists
  // Handle Lists ends here
  function filter(value, list) {
    let todo, doing, review, done
    if (filterBy !== 'all' && filterBy !== 'tags') {
      todo = list.todo.filter((item) =>
        item[filterBy].toLowerCase().includes(value.toLowerCase())
      )
      doing = list.doing.filter((item) =>
        item[filterBy].toLowerCase().includes(value.toLowerCase())
      )
      review = list.review.filter((item) =>
        item[filterBy].toLowerCase().includes(value.toLowerCase())
      )
      done = list.done.filter((item) =>
        item[filterBy].toLowerCase().includes(value.toLowerCase())
      )
    }

    if (filterBy === 'tags') {
      todo = list.todo.filter((item) =>
        !item[filterBy].every((tag) => !tag.toLowerCase().includes(value.toLowerCase()))
      )
      doing = list.doing.filter((item) =>
        !item[filterBy].every((tag) => !tag.toLowerCase().includes(value.toLowerCase()))

      )
      review = list.review.filter((item) =>
        !item[filterBy].every((tag) => !tag.toLowerCase().includes(value.toLowerCase()))

      )
      done = list.done.filter((item) =>
        !item[filterBy].every((tag) => !tag.toLowerCase().includes(value.toLowerCase()))
      )
    }

    if (filterBy === 'all') {
      todo = list.todo.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.assign.toLowerCase().includes(value.toLowerCase()) ||
        !item.tags.every((tag) => !tag.toLowerCase().includes(value.toLowerCase()))
      )
      doing = list.doing.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.assign.toLowerCase().includes(value.toLowerCase()) ||
        !item.tags.every((tag) => !tag.toLowerCase().includes(value.toLowerCase()))
      )
      review = list.review.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.assign.toLowerCase().includes(value.toLowerCase()) ||
        !item.tags.every((tag) => !tag.toLowerCase().includes(value.toLowerCase())))
      done = list.done.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase()) ||
        item.assign.toLowerCase().includes(value.toLowerCase()) ||
        !item.tags.every((tag) => !tag.toLowerCase().includes(value.toLowerCase())))
    }

    return { todo: todo, doing: doing, review: review, done: done }

  }

  // Handle Data
  const cardChangeHandler = (cardInfo, newStatus, targetCardId) => {
    const { id, status: oldStatus } = cardInfo;

    let dropCard = data[oldStatus].find((el) => el.id === id);
    let targetCard =
      targetCardId !== ""
        ? data[newStatus].find((el) => el.id === targetCardId)
        : null;

    let newListOrderValueMax = data[newStatus]
      .map((item) => item.order)
      .reduce((maxValue, a) => Math.max(maxValue, a), 0);

    // CASE 1: If same list, work only this if block then return;
    if (oldStatus === newStatus) {
      let temp = data[oldStatus]
        .map((item) => {
          if (item.id === dropCard.id)
            return {
              ...dropCard,
              order: targetCard
                ? targetCard.order - 1
                : newListOrderValueMax + 1,
            };
          return item;
        })
        .sort((a, b) => a.order - b.order)
        .map((item, i) => {
          return { ...item, order: i + 1 };
        });

      setData((d) => {
        return { ...d, [oldStatus]: temp };
      });

      if (filterValue !== '') {
        setDatafilter(filter(filterValue, data))
      }

      return;
    }
    // CASE 1 ENDS HERE

    // CASE 2: Drag across multiple lists
    let tempGaveList = data[oldStatus]
      .filter((item) => item.id !== id)
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

    let tempRecievedList = [
      ...data[newStatus],
      {
        ...dropCard,
        order: targetCard ? targetCard.order - 1 : newListOrderValueMax + 1,
      },
    ]
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });

    // At last, set state

    setData((d) => {
      return { ...d, [oldStatus]: tempGaveList, [newStatus]: tempRecievedList };
    });

    if (filterValue !== '') {
      setDatafilter((d) => {
        const newD = { ...d, [oldStatus]: tempGaveList, [newStatus]: tempRecievedList }
        return filter(filterValue, newD);
      });
    }

    // CASE 2 ENDS HERE
  };
  // Handle Data ends here

  return (
    <div className={`flex flex-col space-y-5`}>
      <div className={`flex justify-between items-center`}>
        <div className='flex items-center bg-white'>
          <div className='flex items-center border px-2 rounded-l-md shadow-md shadow-gray-100 text-gray-600'>
            <CiFilter className='w-5 h-5' />
            <select className='border-0 focus:ring-0'
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'title'}>Name</option>
              <option value={'description'}>Description</option>
              <option value={'tags'}>Tags</option>
              <option value={'assign'}>Assign</option>
            </select>
          </div>
          <div className='flex justify-between items-center border px-2 rounded-r-md shadow-md shadow-gray-100 text-gray-600'>
            <input type={"search"}
              placeholder="Find project"
              className='border-0 focus:ring-0 w-full'
              onChange={(e) => {
                if (e.target.value === '') {
                  setDatafilter({ todo: [], doing: [], review: [], done: [] })
                }
                setDatafilter(filter(e.target.value, data))
                setFilterValue(e.target.value);
              }}
            />
            <button
              type='submit'>
              <BsSearch />
            </button>
          </div>
        </div>
        <button data-hs-overlay="#hs-focus-management-modal" className={`bg-sky-400 rounded px-2 py-1.5 text-white font-semibold shadow`}>
          + Add Task
        </button>
        <div id="hs-focus-management-modal" className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
          <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
                <h3 className="font-bold text-gray-800 dark:text-white">
                  Modal title
                </h3>
                <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-focus-management-modal">
                  <span className="sr-only">Close</span>
                  <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <label htmlFor="input-label" className="block text-sm font-medium mb-2 dark:text-white">Email</label>
                <input type="email" id="input-label" className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="you@site.com" autoFocus/>
              </div>
              <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
                <button type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-focus-management-modal">
                  Close
                </button>
                <a className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800" href="#">
                  Save changes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between" >
        {lists.map((list) => (
          <Board
            data={filterValue === '' ? data[list.status] : dataFilter[list.status]}
            key={list.status}
            title={list.title}
            status={list.status}
            onChange={cardChangeHandler}
            mapTags={allTags}
          />
        ))}
      </div>
    </div>
  );
}
