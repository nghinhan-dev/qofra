/* eslint-disable react/prop-types */
import Icons from "../Icon/Icon";
import "./Pagination.css";

export default function Pagination({ currentPage, setCurrentPage, max }) {
  return (
    <div className="pagination d__flex">
      <div
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage((index) => index - 1);
          }
        }}
      >
        <Icons
          color={currentPage === 1 ? "hsl(0, 0%, 100%, 45%)" : "white"}
          size={25}
          name={"ChevronLeft"}
        />
      </div>
      {currentPage < 3 ? (
        <>
          <p className={currentPage === 1 ? "isActive" : ""}> 1</p>
          <p
            className={currentPage === 2 ? "isActive" : ""}
            onClick={() => setCurrentPage(2)}
          >
            2
          </p>
          <p onClick={() => setCurrentPage(3)}>3</p>
        </>
      ) : currentPage === max ? (
        <>
          <p onClick={() => setCurrentPage(currentPage - 2)}>
            {currentPage - 2}
          </p>
          <p onClick={() => setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </p>
          <p className="isActive">{max}</p>
        </>
      ) : (
        <>
          <p onClick={() => setCurrentPage(currentPage - 1)}>
            {currentPage - 1}
          </p>
          <p className="isActive">{currentPage}</p>
          <p onClick={() => setCurrentPage(currentPage + 1)}>
            {currentPage + 1}
          </p>
        </>
      )}
      <div
        onClick={() => {
          if (currentPage < max) {
            setCurrentPage((index) => index + 1);
          }
        }}
      >
        <Icons
          color={currentPage === max ? "hsl(0, 0%, 100%, 45%)" : "white"}
          size={25}
          name={"ChevronRight"}
        />
      </div>
    </div>
  );
}
