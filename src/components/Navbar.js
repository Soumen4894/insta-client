import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    // <nav style={{ padding: "1rem", backgroundColor: "#f8f9fa" }}>
    //   <div>
    //     <Link to="/" style={{ marginRight: "1rem" }}>Feed</Link>
    //     <Link to="/profile" style={{ marginRight: "1rem" }}>Profile</Link>
    //     <Link to="/upload">Upload</Link>
    //   </div>
    // </nav>


    <nav className="fixed top-0 left-0 right-0 z-10 bg-white border-b border-gray-300">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png"
            alt="Instagram logo"
            className="w-24"
          />
        </div>
        {/* Search Bar */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search"
            className="px-4 py-1 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
          />
        </div>
        {/* Icons */}
        <div className="flex items-center space-x-6 text-gray-600">
          <Link to="/"><FaHome className="w-6 h-6 cursor-pointer hover:text-gray-800" /></Link>
          <FaSearch className="w-6 h-6 cursor-pointer hover:text-gray-800 md:hidden" />
          <Link to="/upload"><FaPlusSquare className="w-6 h-6 cursor-pointer hover:text-gray-800"/></Link>
          <FaHeart className="w-6 h-6 cursor-pointer hover:text-gray-800" />
          <Link to="/profile"><FaUserCircle className="w-6 h-6 cursor-pointer hover:text-gray-800" /></Link>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;