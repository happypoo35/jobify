import { usePagination, useWindowSize } from "hooks";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { selectPage, setPage } from "app/slice.global";

const Pagination = ({ pageCount }) => {
  const { mobile } = useWindowSize();
  const currentPage = useSelector(selectPage);
  const pages = usePagination({
    pageCount,
    currentPage,
    siblingCount: mobile ? 0 : 1,
  });

  const dispatch = useDispatch();

  const handleNextPage = () => {
    if (currentPage < pageCount) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  return (
    <div className="pagination">
      <button className="pagination-arrow" onClick={handlePrevPage}>
        <FiArrowLeft />
      </button>
      {pages.map((el, id) => {
        if (el === "dots") {
          return (
            <span key={id} className="dots">
              &#8230;
            </span>
          );
        }
        return (
          <button
            key={id}
            className={`pagination-btn ${el === currentPage ? "active" : ""}`}
            onClick={() => dispatch(setPage(el))}
          >
            {el}
          </button>
        );
      })}
      <button className="pagination-arrow" onClick={handleNextPage}>
        <FiArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
