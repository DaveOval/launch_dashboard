import { Link } from "react-router-dom";

export const SideNav = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
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
  );
};
