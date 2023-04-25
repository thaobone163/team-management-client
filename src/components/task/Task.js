import React, { useEffect, useState } from "react";
import Board from "./Board";
import { CiFilter } from 'react-icons/ci'
import { BsSearch } from 'react-icons/bs'
import AddTask from "./AddTask";

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

export default function Task({project_data}) {
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
          <AddTask project_id={project_data.project_id} project_name={project_data.project_name} user={project_data.user} other_member={project_data.teammate}/>
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
