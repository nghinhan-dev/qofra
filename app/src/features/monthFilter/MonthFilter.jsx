/* eslint-disable react/prop-types */
import Square from "./Square";
import { useRef, useState } from "react";
import "./MonthFilter.css";

export default function MonthFilter({ monthArr, setChosenMonth }) {
  const [selectArea, setSelectArea] = useState({
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  });
  const [startCor, setStartCor] = useState({
    clientX: 0,
    clientY: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const itemRefs = useRef(null);

  function getMap() {
    if (!itemRefs.current) {
      itemRefs.current = new Map();
    }

    return itemRefs.current;
  }

  return (
    <div
      onMouseDown={(e) => {
        setStartCor(() => ({
          clientX: e.clientX,
          clientY: e.clientY,
        }));
        setIsDragging(true);
      }}
      onMouseMove={(e) => {
        isDragging &&
          setSelectArea(() => ({
            top: e.clientY > startCor.clientY ? startCor.clientY : e.clientY,
            bottom: e.clientY > startCor.clientY ? e.clientY : startCor.clientY,
            right: e.clientX > startCor.clientX ? e.clientX : startCor.clientX,
            left: e.clientX > startCor.clientX ? startCor.clientX : e.clientX,
          }));
      }}
      onMouseUp={() => {
        setIsDragging(false);

        const map = getMap();
        let newChosenMonth = [];

        map.forEach((value, key) => {
          const squareX = selectArea.left;
          const squareY = selectArea.top;
          const squareWidth = selectArea.right - selectArea.left;
          const squareHeight = selectArea.bottom - selectArea.top;

          const itemElm = value.getBoundingClientRect();
          const isSelected =
            squareY < itemElm.top + itemElm.height &&
            itemElm.top < squareY + squareHeight &&
            itemElm.left + itemElm.width > squareX &&
            squareX + squareWidth > itemElm.left;

          isSelected && newChosenMonth.push(key);
        });

        console.log(newChosenMonth);
        setChosenMonth(newChosenMonth);
        setSelectArea({
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        });
        setStartCor({
          clientX: 0,
          clientY: 0,
        });
      }}
      className="month_filter"
    >
      <Square {...selectArea} />
      <div className="month__filter-container">
        {monthArr.map((month) => (
          <div
            key={month.title}
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(month.title, node);
              } else {
                map.delete(month.title);
              }
            }}
          >
            <p>{month.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
