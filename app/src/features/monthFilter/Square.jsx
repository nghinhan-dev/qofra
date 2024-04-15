/* eslint-disable react/prop-types */

export default function Square({ top, left, bottom, right }) {
  return (
    <div
      style={{
        background: "yellow",
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        height: `${bottom - top}px`,
        width: `${right - left}px`,
      }}
    ></div>
  );
}
