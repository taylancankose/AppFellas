import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAuthState,
  updateLoading,
  updateLoggedIn,
  updateUser,
} from "../store/auth";
import { getClient } from "../api/client";
import { Keys, removeFromLocalStorage } from "../utils/localStorage";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loggedIn } = useSelector(getAuthState);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    dispatch(updateLoading(true));
    try {
      const client = await getClient();
      await client.post("/auth/logout");
      removeFromLocalStorage(Keys.AUTH_TOKEN);
      dispatch(updateUser(null));
      dispatch(updateLoggedIn(false));
      toast.success("Logout successful");
    } catch (error) {
      console.log("Logout failed", error);
    }
    dispatch(updateLoading(false));
  };

  return (
    <nav className="bg-gray-50 overflow-x-hidden">
      <div className="flex flex-wrap items-center justify-between  p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <div className="w-8 h-8 bg-purple-700 flex items-center rounded-full">
            <i className="fa-solid fa-plane text-gray-50 text-2xl -ml-1"></i>
          </div>
          <span className="self-center text-xl font-semibold whitespace-nowrap uppercase">
            Plane Scape
          </span>
        </Link>

        {/* Hamburger Button for Mobile */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-90 z-50 flex flex-col items-center justify-center text-white">
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-white text-3xl focus:outline-none"
            >
              &times; {/* 'X' symbol for close */}
            </button>

            <ul className="font-medium flex flex-col space-y-8 text-xl">
              <li className="flex items-center space-x-4 cursor-pointer">
                <i className="fa-solid fa-tag text-purple-300 text-5xl"></i>
                <a href="#" className="block">
                  Deals
                </a>
              </li>
              <Link
                to={"/discover"}
                className="flex items-center space-x-4 cursor-pointer"
              >
                <i className="fa-solid fa-earth-americas text-purple-300 text-5xl"></i>
                <span className="block">Discover</span>
              </Link>
              {loggedIn ? (
                <>
                  <Link
                    to={`/my-flights/${user?.id}`}
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <img
                      src="https://img.freepik.com/free-photo/brunette-girl-posing_23-2148108748.jpg"
                      className="w-12 h-12 object-cover rounded-full"
                      alt="User avatar"
                    />
                    <span className="block">{user.name || "User"}</span>
                  </Link>
                  <li onClick={handleLogout} className="cursor-pointer">
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/register"
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <span className="block">Register</span>
                  </Link>
                  <Link
                    to="/auth/login"
                    className="flex items-center space-x-4 cursor-pointer"
                  >
                    <span className="block">Login</span>
                  </Link>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li className="flex items-center space-x-1">
              <i className="fa-solid fa-tag text-purple-700 text-xl"></i>
              <a
                href="#"
                className="block py-2 px-3 rounded md:bg-transparent m md:p-0"
                aria-current="page"
              >
                Deals
              </a>
            </li>
            <Link
              to={"/discover"}
              className="flex items-center space-x-2 justify-center"
            >
              <i className="fa-solid fa-earth-americas text-purple-700 text-xl"></i>
              <span
                className="block py-2 px-3 rounded md:bg-transparent m md:p-0"
                aria-current="page"
              >
                Discover
              </span>
            </Link>
            {user?.name ? (
              <>
                <Link
                  to={`/my-flights/${user?.id}`}
                  className="flex items-center space-x-1"
                >
                  <img
                    src="https://img.freepik.com/free-photo/brunette-girl-posing_23-2148108748.jpg"
                    className="w-10 h-10 object-cover rounded-full"
                    alt="User avatar"
                  />
                  <span
                    className="block py-2 px-3 rounded md:bg-transparent m md:p-0"
                    aria-current="page"
                  >
                    {user.name}
                  </span>
                </Link>
                <li
                  onClick={handleLogout}
                  className="cursor-pointer flex items-center space-x-1"
                >
                  Logout
                </li>
              </>
            ) : (
              <>
                <Link
                  to="/auth/register"
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <span className="block">Register</span>
                </Link>
                <Link
                  to="/auth/login"
                  className="flex items-center space-x-4 cursor-pointer"
                >
                  <span className="block">Login</span>
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
