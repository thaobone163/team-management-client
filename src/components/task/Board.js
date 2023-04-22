import React from "react";
import Card from "./Card";
import { BiTask } from 'react-icons/bi'

export default function Board({ data, title, status, onChange, mapTags }) {
  // Sort data (Might need useMemo)
  let sorted = data.sort((a, b) => a.order - b.order);

  const onDragEnterHandler = (e) => {
    e.preventDefault();
  };
  const onDragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea") {
      setTimeout(() => {
        e.target.className = "boardContentArea hovered";
      }, 0);
    }
  };
  const onDragLeaveHandler = (e) => {
    e.preventDefault();
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  };
  const onDropHandler = (e) => {
    let cardInfo = JSON.parse(e.dataTransfer.getData("cardInfo"));
    let targetCardId = e.target.id;
    onChange(cardInfo, status, targetCardId);
    if (e.target.className === "boardContentArea hovered") {
      setTimeout(() => {
        e.target.className = "boardContentArea";
      }, 0);
    }
  };

  // returns JSX - Render cards
  const renderCards = () => {
    return sorted.map((item) => (
      <Card
        key={`status-${item.id}`}
        id={item.id}
        project={item.project}
        description={item.description}
        assign={item.assign}
        duedate={item.duedate}
        estimate={item.estimate}
        spend={item.spend}
        status={status}
        title={item.title}
        tags={item.tags}
        mapTags={mapTags}
      />
    ));
  };

  return (
    <div className="w-[23.75%]">
      <div>
        <div
          className="flex flex-col space-y-4 w-full"
          onDragEnter={onDragEnterHandler}
          onDragOver={onDragOverHandler}
          onDragLeave={onDragLeaveHandler}
          onDrop={onDropHandler}
        >
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
          {renderCards()}
        </div>
      </div>
    </div>
  );
}
