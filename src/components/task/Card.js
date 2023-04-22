import React, { useState } from "react";
import { AiTwotoneCalendar } from 'react-icons/ai'
import { GiSandsOfTime } from 'react-icons/gi'
import { FiMoreHorizontal } from 'react-icons/fi'
import { identicon } from 'minidenticons'
import { formatToFE } from "@/util/common";

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

export default function Card({ id, project, description, assign, duedate, estimate, spend, status, title, tags, mapTags }) {
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

  const formatToFe = formatToFE(duedate)
  const date = new Date(formatToFe).toString().split(' ')
  if(date[3] == new Date().getFullYear()) {
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

  spend = spend.replace(' Hours', 'h').replace(' Hour', 'h').replace(' Minutes', 'm').replace(' Minute', 'm').replace(' Weeks', 'w').replace(' Week', 'w')
  estimate = estimate.replace(' Hours', 'h').replace(' Hour', 'h').replace(' Minutes', 'm').replace(' Minute', 'm').replace(' Weeks', 'w').replace(' Week', 'w')

  return (
    <div
      id={id}
      className={`${onHold ? "hidden" : ""} flex flex-col space-y-2 w-full bg-white shadow p-3 rounded`}
      draggable="true"
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
    >
      <div className="flex justify-between">
        <div className="font-semibold text-gray-800">
          {title}
        </div>
        <FiMoreHorizontal />
      </div>
      <div className="text-gray-600 text-xs">
        {description}
      </div>
      <div className="flex space-x-2">
        {tags.map((tag, index) => (
          <div key={index} className={`text-xs ${mapTags.get(tag)} text-white p-1 rounded font-semibold`}>
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
            <GiSandsOfTime className={`mr-0.5 ${spend > estimate? 'text-rose-700' : ''}`} />
            <span>
              {estimate}
            </span>
          </div>
        </div>
        <div title={assign}>
          <img src={
            'data:image/svg+xml;utf8,' + encodeURIComponent(identicon(assign))
          }
            alt={assign}
            className="w-6 h-6 border shadow rounded-full" />
        </div>
      </div>
    </div>
  );
}
