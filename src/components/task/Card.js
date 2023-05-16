import React, { useState } from "react";
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GiSandsOfTime } from 'react-icons/gi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { identicon } from 'minidenticons'
import { formatToFE, simpleTimer } from "@/util/common";
import { BsInfoCircle, BsPencil } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import Link from "next/link";
import EditTask from "./EditTask";
import { deleteTask } from "@/util/mics";

const colorTag = new Map([
  [0, 'bg-slate-400'],
  [1, 'bg-red-400'],
  [2, 'bg-orange-400'],
  [3, 'bg-amber-400'],
  [4, 'bg-yellow-400'],
  [5, 'bg-lime-400'],
  [6, 'bg-green-400'],
  [7, 'bg-emerald-400'],
  [8, 'bg-teal-400'],
  [9, 'bg-cyan-400'],
  [10, 'bg-sky-400'],
  [11, 'bg-blue-400'],
  [12, 'bg-indigo-400'],
  [13, 'bg-violet-400'],
  [14, 'bg-purple-400'],
  [15, 'bg-fuchsia-400'],
  [16, 'bg-pink-400'],
  [17, 'bg-rose-400'],
])

export default function Card({ taskInfo, id, status, mapTags, findTargetId, projectInfo, fn }) {
  const [detail, setDetail] = useState(taskInfo)
  let duedate, spend, estimate
  let i = 0
  mapTags.forEach((_, key) => {
    mapTags.set(key, colorTag.get(i))
    i++
  });

  const [onHold, setOnHold] = useState(false);

  const dragStartHandler = (e) => {
    e.dataTransfer.setData("cardInfo", JSON.stringify({ id, status }));
    e.target.className += " ohhold";
    setTimeout(() => {
      setOnHold(true);
    }, 0);
  };
  const dragEndHandler = () => {
    setOnHold(false);
  };
  const onDragOverHandler = (e) => {
    e.preventDefault();
    findTargetId(id)
    if (e.target.className === "card") {
      setTimeout(() => {
        e.target.className = "card anotherCardOnTop";
      }, 0);
    }
  };
  const onDragLeaveHandler = (e) => {
    resetClassName(e);
  };
  const onDropHandler = (e) => {
    resetClassName(e);
    /**
     TODO: Remove all anotherCardOnTop classnames
     from DOM after drop complete.
    */
  };

  const formatToFe = formatToFE(detail.duedate)
  const date = new Date(formatToFe).toString().split(' ')
  if (date[3] == new Date().getFullYear()) {
    duedate = date.slice(1, 3).join(' ')
  } else {
    duedate = date.slice(1, 4).join(' ')
  }

  const resetClassName = (e) => {
    e.preventDefault();
    let isCard =
      e.target.className === "card" ||
      e.target.className === "card anotherCardOnTop";
    if (isCard) {
      setTimeout(() => {
        e.target.className = "card";
      }, 0);
    }
  };

  spend = simpleTimer(detail.spend)
  estimate = simpleTimer(detail.estimate)

  async function handleDeleteTask() {
    await deleteTask(id).then((data) => {
      if (data.success) {
        fn()
      }
    })
  }

  return (
    <div
      id={id}
      className={`card ${onHold ? "hidden" : ""} `}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <div className="flex flex-col space-y-2 w-full bg-white shadow p-3 rounded">
        <div className="flex justify-between items-start w-full">
          <Link href={`/task/${id}`} className="font-semibold text-gray-800 cursor-pointer">
            {detail.title}
          </Link>
          <div className="hs-dropdown relative inline-flex">
            <button id="hs-dropdown-with-icons" type="button" className="hs-dropdown-toggle inline-flex justify-center items-center gap-2 font-medium bg-white text-gray-700 align-middle rounded-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-200 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
              <FiMoreHorizontal />
            </button>

            <div className="hs-dropdown-menu z-10 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-fit bg-white shadow-lg border rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" aria-labelledby="hs-dropdown-with-icons">
              <div className="py-2 first:pt-0 last:pb-0">
                <button type="button" data-hs-overlay={`#hs-overlay-edit-${id}`} className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-sky-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <BsPencil />
                  Edit
                </button>
                <button data-hs-overlay={`#hs-vertically-centered-delete-task-${id}`} className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-rose-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <AiOutlineDelete />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-600 text-sm font-semibold">
          Stage: {detail.stage}
        </div>
        <div className="text-gray-600 text-xs">
          {detail.description}
        </div>
        <div className="flex flex-wrap w-full">
          {detail.tags.map((tag, index) => (
            <div key={index} className={`text-xs ${mapTags.get(tag)} text-white p-1 mr-2 my-1 rounded font-semibold max-w-full whitespace-nowrap`}>
              {tag}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-700 font-medium">
          <div className="flex space-x-2">
            <div className={`flex items-center ${new Date(formatToFE(duedate)) < new Date() ? 'text-rose-700' : ''}`}>
              <AiTwotoneCalendar className="mr-0.5" />
              <span>
                {duedate}
              </span>
            </div>
            <div className={`flex items-center`}>
              <GiSandsOfTime className={`mr-0.5 ${spend > estimate ? 'text-rose-700' : ''}`} />
              <span>
                {estimate}
              </span>
            </div>
          </div>
          <div title={detail.assign}>
            <img src={
              'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(detail.assign.replace('@', '')))
            }
              alt={detail.assign}
              className="w-6 h-6 border shadow rounded-full" />
          </div>
        </div>
      </div>
      <div id={`hs-overlay-edit-${id}`} className="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 right-0 transition-all duration-300 transform h-full max-w-xs w-full z-[60] bg-white border-l dark:bg-gray-800 dark:border-gray-700" tabIndex="-1">
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <div className="flex items-center text-2xl text-cyan-600 font-semibold dark:text-white">
            <BsPencil className='mr-3' />
            Edit Task
          </div>
          <button type="button" className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white text-sm dark:text-gray-500 dark:hover:text-gray-400 dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay={`#hs-overlay-edit-${id}`}>
            <span className="sr-only">Close modal</span>
            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-scroll overscroll-y-contain h-screen">
          <EditTask taskId={id} taskInfo={taskInfo} projectInfo={projectInfo} detail={{ detail, setDetail }} />
        </div>
      </div>
      <div id={`hs-vertically-centered-delete-task-${id}`} className="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
        <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
          <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
            <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white">
                Delete this task
              </h3>
              <button type="button" className="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay={`#hs-vertically-centered-delete-task-${id}`}>
                <span className="sr-only">Close</span>
                <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <p className="text-gray-800 dark:text-gray-400">
                If you select &apos;Delete&apos; , this task will be permanently deleted and cannot be undone! <br /><br />
                <span className="font-medium">Are you sure delete this task?</span>
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-gray-700">
              <button type="button" className="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-overlay={`#hs-vertically-centered-delete-task-${id}`}>
                Cancel
              </button>
              <button onClick={handleDeleteTask} data-hs-overlay={`#hs-vertically-centered-delete-task-${id}`} className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-rose-500 text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
