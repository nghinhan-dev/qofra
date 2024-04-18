/* eslint-disable react/prop-types */
import Square from "./Square";
import { useRef, useState } from "react";
import "./DragFilter.css";

export default function DragFilter({ filterArr, setState, colNum }) {
  const [isDragging, setIsDragging] = useState(false);

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

  const itemRefs = useRef(null);

  function getMap() {
    if (!itemRefs.current) {
      itemRefs.current = new Map();
    }

    return itemRefs.current;
  }

  const onMouseDownHandler = (e) => {
    if (!e.ctrlKey) {
      setStartCor(() => ({
        clientX: e.clientX,
        clientY: e.clientY,
      }));
      setIsDragging(true);
    }
  };

  const onMouseMoveHandler = (e) => {
    if (isDragging && !e.ctrlKey) {
      setSelectArea(() => ({
        top: e.clientY > startCor.clientY ? startCor.clientY : e.clientY,
        bottom: e.clientY > startCor.clientY ? e.clientY : startCor.clientY,
        right: e.clientX > startCor.clientX ? e.clientX : startCor.clientX,
        left: e.clientX > startCor.clientX ? startCor.clientX : e.clientX,
      }));
    }
  };

  const onMouseUpHanlder = (e) => {
    if (e.ctrlKey && !isDragging) {
      return;
    }

    setIsDragging(false);

    const map = getMap();
    let newState = [];
    let indexCount = 0;

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

      newState.push({
        title: key,
        isSelected,
        index: indexCount++,
      });
    });

    setState(newState);
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
  };

  const selectByClick = (e, index) => {
    if (e.ctrlKey) {
      const newState = [...filterArr];

      newState[index] = { ...newState[index], isSelected: true };
      setState(newState);
    }
  };

  return (
    <div
      onMouseDown={onMouseDownHandler}
      onMouseMove={onMouseMoveHandler}
      onMouseUp={onMouseUpHanlder}
      className="filter"
    >
      <Square {...selectArea} />
      <div
        style={{
          gridTemplateColumns: `repeat(${colNum}, auto)`,
        }}
        className="filter-container"
      >
        {filterArr.map((month) => (
          <div
            key={month.title}
            onClick={(e) => selectByClick(e, month.index)}
            className={month.isSelected ? "isSelected" : ""}
            ref={(node) => {
              const map = getMap();
              if (node) {
                map.set(month.title, node);
              } else {
                map.delete(month.title);
              }
            }}
          >
            <p>
              {month.title === "moldSetter"
                ? "Mold Setter"
                : month.title.charAt(0).toUpperCase() + month.title.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
