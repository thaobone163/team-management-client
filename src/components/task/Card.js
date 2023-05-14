import React, { useState } from "react";
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GiSandsOfTime } from 'react-icons/gi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { identicon } from 'minidenticons'
import { formatToFE, simpleTimer } from "@/util/common";
import { BsInfoCircle } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'

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

export default function Card({ taskInfo, id, status, mapTags, findTargetId }) {
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

  const formatToFe = formatToFE(taskInfo.duedate)
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

  spend = simpleTimer(taskInfo.spend)
  estimate = simpleTimer(taskInfo.estimate)

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
        <div className="flex justify-between items-start">
          <a href={`/task/${id}`} className="font-semibold text-gray-800 cursor-pointer">
            {taskInfo.title}
          </a>
          <div className="hs-dropdown relative inline-flex">
            <button id="hs-dropdown-with-icons" type="button" className="hs-dropdown-toggle inline-flex justify-center items-center gap-2 font-medium bg-white text-gray-700 align-middle rounded-sm hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-offset-white focus:ring-gray-200 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800">
              <FiMoreHorizontal />
            </button>

            <div className="hs-dropdown-menu z-10 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mt-2 min-w-fit bg-white shadow-lg border rounded-lg p-2 mt-2 divide-y divide-gray-200 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700" aria-labelledby="hs-dropdown-with-icons">
              <div className="py-2 first:pt-0 last:pb-0">
                <a href={`/task/${id}`} className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <BsInfoCircle />
                  Edit
                </a>
                <button className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                  <AiOutlineDelete />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-gray-600 text-sm font-semibold">
          Stage: {taskInfo.stage}
        </div>
        <div className="text-gray-600 text-xs">
          {taskInfo.description}
        </div>
        <div className="flex flex-wrap ">
          {taskInfo.tags.map((tag, index) => (
            <div key={index} className={`text-xs ${mapTags.get(tag)} text-white p-1 mr-2 my-1 rounded font-semibold`}>
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
          <div title={taskInfo.assign}>
            <img src={
              'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(taskInfo.assign.replace('@', '')))
            }
              alt={taskInfo.assign}
              className="w-6 h-6 border shadow rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
