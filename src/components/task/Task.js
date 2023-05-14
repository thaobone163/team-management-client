import React, { useEffect, useState } from "react";
import Board from "./Board";
import { CiFilter } from 'react-icons/ci'
import { BsSearch } from 'react-icons/bs'
import AddTask from "./AddTask";
import { getListTaskByProject, updateOrderTask, updateStatusTask } from "@/util/mics";
import { capitalizeFirstLetter } from "@/util/common";

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

function getAllTags(data) {
  const allTags = new Map()
  data.todo.forEach((item) => {
    item.tags.forEach((tag) => {
      allTags.set(tag, '')
    })
  })
  data.doing.forEach((item) => {
    item.tags.forEach((tag) => {
      allTags.set(tag, '')
    })
  })
  data.done.forEach((item) => {
    item.tags.forEach((tag) => {
      allTags.set(tag, '')
    })
  })
  data.review.forEach((item) => {
    item.tags.forEach((tag) => {
      allTags.set(tag, '')
    })
  })
  return allTags
}

const reorder = (list, dropCard, targetCard, caseOrder) => {
  const result = Array.from(list);
  const startIndex = result.indexOf(dropCard)
  const endIndex = result.indexOf(targetCard)
  const [removed] = caseOrder === 1 ? result.splice(startIndex, 1) : [dropCard]
  result.splice(endIndex, 0, removed);

  result.map((item, index) => {
    item.order = index + 1
  })

  return result;
}

export default function Task({ project_data, timeline }) {
  const [filterBy, setFilterBy] = useState('all')
  const [filterValue, setFilterValue] = useState('')
  const [lists, setLists] = useState(initialLists);
  const [data, setData] = useState({ todo: [], doing: [], review: [], done: [] });
  const [allTags, setAllTags] = useState(new Map())
  const [dataFilter, setDatafilter] = useState({ todo: [], doing: [], review: [], done: [] })

  useEffect(() => {
    getTaskList()
  }, [])

  async function getTaskList() {
    await getListTaskByProject(project_data.project_id).then((data) => {
      if (data.success) {
        setData(data.data)
        setAllTags(getAllTags(data.data))
      }
    })
  }

  async function updateOrder(list) {
    if (list !== null) {
      list.map((item) => {
        updateOrderTask(item._id, item.order).then((data) => {
          if(data.success) {
            getTaskList()
          } else {
            alert(data.message)
          }
        })
      })
    }
  }

  async function updateStatus(id, status) {
    await updateStatusTask(id, status).then((data) => {
      if(data.success) {
        getTaskList()
      } else {
        alert(status)
      }
    })
  }

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

    let dropCard = data[oldStatus].find((el) => el._id === id);

    let targetCard =
      targetCardId !== ""
        ? data[newStatus].find((el) => el._id === targetCardId)
        : null;

    let newListOrderValueMax = data[newStatus]
      .map((item) => item.order)
      .reduce((maxValue, a) => Math.max(maxValue, a), 0);

    // CASE 1: If same list, work only this if block then return;
    if (oldStatus === newStatus) {
      let newOrder = reorder(data[oldStatus], dropCard, targetCard, 1)
      setData((d) => {
        return { ...d, [oldStatus]: newOrder };
      });
      updateOrder(newOrder)

      if (filterValue !== '') {
        setDatafilter(filter(filterValue, data))
      }

      return;
    }
    // CASE 1 ENDS HERE

    // CASE 2: Drag across multiple lists
    let tempGaveList = data[oldStatus]
      .filter((item) => item._id !== id)
      .sort((a, b) => a.order - b.order)
      .map((item, i) => {
        return { ...item, order: i + 1 };
      });


    dropCard.status = capitalizeFirstLetter(newStatus)

    let tempRecievedList = targetCard ? reorder(data[newStatus], dropCard, targetCard, 2) :
      [
        ...data[newStatus],
        {
          ...dropCard,
          order: newListOrderValueMax + 1,
        },
      ]
        .sort((a, b) => a.order - b.order)
        .map((item, i) => {
          return { ...item, order: i + 1 };
        })

    // At last, set state

    setData((d) => {
      return { ...d, [oldStatus]: tempGaveList, [newStatus]: tempRecievedList };
    });

    updateOrder(tempGaveList)
    updateStatus(dropCard._id, dropCard.status)
    updateOrder(tempRecievedList)



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
          <AddTask project_id={project_data.project_id} project_name={project_data.project_name} user={project_data.user} other_member={project_data.teammate} timeline={timeline} fn={getTaskList} />
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
