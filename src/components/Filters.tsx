import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../hooks";

// Interface Rocket 
interface Rocket {
  id: string;
  name: string;
}

export const Filters = ({ setFilters }: any) => {
  //State for filters
  const [rockets, setRockets] = useState<Rocket[]>([]);
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState('');
  const [rocket, setRocket] = useState('');

  //Inicialization of notification
  const showToast = useToast();

  //Get the rocket types
  useEffect(() => {
    const fetchRockets = async () => {
      try {
        const response = await axios.get("https://api.spacexdata.com/v4/rockets");
        setRockets(response.data);
      } catch (error) {
        showToast("Error fetching rockets data", "error")
        console.error("Error fetching rockets:", error);
      }
    };

    fetchRockets();
  }, []);

  const validateForm = () => {
    // Validate year only if it is provided
    if (year.trim() && (isNaN(Number(year)) || Number(year) < 1950 || Number(year) > new Date().getFullYear())) {
      showToast("Please enter a valid year", "warning");
      return false;
    }

    // Optionally validate result and rocket if provided
    if (result && !['true', 'false'].includes(result)) {
      showToast("Please select a valid result", "warning");
      return false;
    }

    if (rocket && !rockets.some(r => r.id === rocket)) {
      showToast("Please select a valid rocket", "warning");
      return false;
    }

    return true;
  };

  // Simple sanitization: remove quotes
  const sanitizeInput = (input: string) => {
    return input.replace(/['"]/g, ""); 
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Sanitize inputs before setting filters
    const sanitizedSearch = sanitizeInput(search);
    const sanitizedYear = sanitizeInput(year);
    const sanitizedResult = sanitizeInput(result);
    const sanitizedRocket = sanitizeInput(rocket);

    setFilters({ search: sanitizedSearch, year: sanitizedYear, result: sanitizedResult, rocket: sanitizedRocket });
    showToast("Filters applied successfully!", "success");
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
            <option value="true">Successful</option>
            <option value="false">Failed</option>
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
