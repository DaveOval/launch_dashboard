import { useEffect, useState } from "react";
import axios from "axios";

// Define an interface for Rocket data
interface Rocket {
  id: string;
  name: string;
}

export const Filters = ({ setFilters }: any) => {
  // Define rockets with the correct type
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState('');
  const [rocket, setRocket] = useState('');

  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v4/rockets");
        setRockets(response.data);
      } catch (error) {
        console.error("Error fetching rockets:", error);
      }
    };

    fetchRockets();
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFilters({ search, year, result, rocket });
  };

  return (
    <nav className="p-4 md:flex md:space-x-4 md:justify-between md:items-center">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        {/* Mission Name */}
        <div className="flex-1">
          <label htmlFor="search" className="block mb-2 text-sm font-medium text-gray-900">Mission Name</label>
          <input 
            type="text" 
            id="search" 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Enter mission name" 
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
        </div>

        {/* Year */}
        <div className="flex-1">
          <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 ">Year</label>
          <input 
            type="number" 
            id="year" 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            placeholder="Year of launch" 
            value={year}
            onChange={(e) => setYear(e.target.value)} 
          />
        </div>

        {/* Result */}
        <div className="flex-1">
          <label htmlFor="result" className="block mb-2 text-sm font-medium text-gray-900 ">Result</label>
          <select 
            id="result" 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
            value={result} 
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="">Select result</option>
            <option value="success">Successful</option>
            <option value="failure">Failed</option>
          </select>
        </div>

        {/* Rocket */}
        <div className="flex-1">
          <label htmlFor="rocket" className="block mb-2 text-sm font-medium text-gray-900 ">Rocket</label>
          <select 
            id="rocket" 
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={rocket}
            onChange={(e) => setRocket(e.target.value)}
          >
            <option value="">Select a rocket</option>
            {rockets.map((rocket) => (
              <option key={rocket.id} value={rocket.id}>
                {rocket.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-lg focus:ring-4 focus:ring-blue-300">
          Apply Filters
        </button>
      </form>
    </nav>
  );
};
