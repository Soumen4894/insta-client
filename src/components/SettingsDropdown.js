import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { logout } from '../actions/authActions'; 
import { AiOutlineSetting } from 'react-icons/ai';
import { VscSignOut } from 'react-icons/vsc';
import { clearUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';


const SettingsDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef();
//   const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
    localStorage.removeItem("token")
    // dispatch(clearUser());
    navigate("/login")
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 absolute top-20 right-20 transform -translate-y-4"
        onClick={() => setOpen(!open)}
      >
        <AiOutlineSetting className="text-lg text-gray" />
      </button>
      {open && (
        <div
          className="absolute top-full right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div
            onClick={handleLogout}
            className="flex items-center gap-x-2 py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
