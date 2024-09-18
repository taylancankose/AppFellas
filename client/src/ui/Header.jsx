import React from "react";

function Header() {
  return (
    <header className="w-full p-6">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center justify-center">
          <div className="w-12 h-12 bg-purple-700 flex items-center rounded-full">
            <i className="fa-solid fa-plane text-gray-50 text-3xl -ml-1"></i>
          </div>
          <h1 className="text-2xl font-bold ml-2">PLANE SCAPE</h1>
        </div>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1">
            <i className="fa-solid fa-tag text-purple-700 text-xl"></i>
            <a href="#" className="text-gray-600">
              Deals
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <i className="fa-solid fa-earth-americas text-purple-700 text-xl"></i>
            <a href="#" className="text-gray-600">
              Discover
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <img
              src="https://img.freepik.com/free-photo/brunette-girl-posing_23-2148108748.jpg"
              className="w-10 h-10 object-cover rounded-full"
            />
            <a href="#" className="text-gray-600">
              Joane Smith
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
