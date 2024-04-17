/* eslint-disable react/prop-types */

export default function Square({ top, left, bottom, right }) {
  return (
    <div
      style={{
        background: "#eaea1d56",
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        height: `${bottom - top}px`,
        width: `${right - left}px`,
      }}
    ></div>
  );
}
