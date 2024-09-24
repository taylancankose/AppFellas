import { useDispatch, useSelector } from "react-redux";
import { getFlights } from "../views/Home";
import { getFlightState, updatePage } from "../store/flight";
import { useEffect } from "react";

function Pagination({ filter }) {
  const { page, flights } = useSelector(getFlightState);
  const dispatch = useDispatch();

  useEffect(() => {
    getFlights(dispatch, filter, page);
  }, [dispatch, page]);

  return (
    <nav className="pb-6">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        {page > 0 && (
          <li>
            <button
              onClick={() => dispatch(updatePage(page - 1))}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
        )}
        <li>
          <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
            {page}
          </span>
        </li>
        {flights?.length === 20 && (
          <li>
            <button
              onClick={() => dispatch(updatePage(page + 1))}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
