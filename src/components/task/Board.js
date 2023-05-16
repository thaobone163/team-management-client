import React, { useState } from "react";
import Card from "./Card";
import { BiTask } from 'react-icons/bi'

export default function Board({ data, title, status, onChange, mapTags, projectInfo, fn}) {
  const [targetCardId, setTargetCardId] = useState()
  function findTargetId(targetId) {
    setTargetCardId(targetId)
  }
  // Sort data (Might need useMemo)
  let sorted = data.sort((a, b) => a.order - b.order);

  const onDragEnterHandler = (e) => {
    e.preventDefault();
  };
  const onDragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea h-full") {
      setTimeout(() => {
        e.target.className = "boardContentArea h-full hovered";
      }, 0);
    }
  };
  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea h-full hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea h-full";
      }, 0);
    }
  };
  const onDropHandler = (e) => {
    e.preventDefault();
    let cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    onChange(cardInfo, status, targetCardId);
    if (e.target.className === "boardContentArea h-full hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea h-full";
      }, 0);
    }
  };

  // returns JSX - Render cards
  const renderCards = () => {
    return sorted.map((item) => (
      <Card
        key={`status-${item._id}`}
        taskInfo={item}
        id={item._id}
        status={status}
        mapTags={mapTags}
        findTargetId={findTargetId}
        projectInfo={projectInfo}
        fn={fn}
      />
    ));
  };

  return (
    <div className="w-[23.75%]">
      <div className="h-full">
        <div className={`flex justify-between items-center border-b-2 pb-3 ${title === 'To Do' ?
          'border-b-rose-500' : title === 'Doing' ? 'border-b-sky-500' : title === 'Done' ? 'border-b-green-500' : 'border-b-yellow-400'}`}>
          <div className="flex space-x-2">
            <div className={`${title === 'To Do' ? 'bg-rose-500' : title === 'Doing' ? 'bg-sky-500' : title === 'Done' ? 'bg-green-500' : 'bg-yellow-400'}  w-2.5 h-2.5 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700`}></div>
            <h4 className={`font-semibold `}>{title}</h4>
          </div>
          <div className={`flex items-center text-gray-600 text-sm`}>
            <BiTask className={`mr-1`} />
            {sorted.length}
          </div>
        </div>
        <div
          className="boardContentArea h-full"
          onDragEnter={onDragEnterHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
          <div className="flex flex-col pt-4 space-y-4 min-h-full w-full">
            {renderCards()}
          </div>
        </div>
      </div>
    </div>
  );
}
