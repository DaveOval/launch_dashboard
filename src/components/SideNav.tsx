import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoHomeSharp } from "react-icons/io5";
import { MdFavorite, MdRocketLaunch } from "react-icons/md";

export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Botón de menú para móvil */}
      <button 
        onClick={toggleMenu} 
        className={`p-2 text-black bg-slate-200 mt-3 rounded-lg md:hidden absolute transition-all z-[9999] duration-300 ${isOpen ? "left-64" : "left-3"}`}>
        {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed z-[999] inset-0 bg-gray-900 bg-opacity-75 transition-opacity md:relative md:translate-x-0 md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="w-64 bg-gray-900 text-white h-full">
          <div className="h-16 flex items-center justify-center text-xl font-bold bg-gray-800">
            SpaceX Dashboard
          </div>
          <nav className="mt-5">
            <ul>
              <li className="px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-700">
                <Link to="/" className="flex items-center gap-4 w-full h-full">
                  <IoHomeSharp className="h-5 w-5" />
                  <span>Home</span>
                </Link>
              </li>

              <li className="px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-700">
                <Link to="/launches" className="flex items-center gap-4 w-full h-full">
                  <MdRocketLaunch className="h-5 w-5" />
                  <span>Launches</span>
                </Link>
              </li>

              <li className="px-4 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-gray-700">
                <Link to="/favorites" className="flex items-center gap-4 w-full h-full">
                  <MdFavorite className="h-5 w-5" />
                  <span>Favorites</span>
                </Link>
              </li>
              
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
