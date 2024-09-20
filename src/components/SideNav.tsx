import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from 'react-icons/fa';

export const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Botón de menú para móvil */}
      <button onClick={toggleMenu} className="p-4 text-black md:hidden">
        {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity md:relative md:translate-x-0 md:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="w-64 bg-gray-900 text-white h-full">
          <div className="h-16 flex items-center justify-center text-xl font-bold bg-gray-800">
            SpaceX Dashboard
          </div>
          <nav className="mt-5">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/">Home</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/launchs">Launches</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-700">
                <Link to="/favorites">Favorites</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
