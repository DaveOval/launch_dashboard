import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>([]); 

  useEffect(() => {
    // Cargar los favoritos desde el local storage
    const storedFavorites: string[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const handleDelete = (id: string) => { 
    const updatedFavorites = favorites.filter(favorite => favorite !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); 
  };

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen flex flex-col">
      <p className="text-2xl text-gray-900 mt-5 mb-5">Your favorites</p>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID of Launch
              </th>
              <th scope="col" className="px-6 py-3">
                Link
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.length > 0 ? (
              favorites.map((id, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id}
                  </th>
                  <td className="px-6 py-4">
                    <Link to={`/launch/${id}`}>
                      See more
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                  No favorites found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
