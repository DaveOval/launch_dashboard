import { useState } from "react";

import { Filters, LaunchCard, Loader } from "../components";
import { useFetch } from "../hooks";

//Interface of a launch objetc
interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
}

export const LaunchList = () => {
  //Fetch launches
  const { data, loading, error } = useFetch<Launch[]>("https://api.spacexdata.com/v4/launches");
  //Sate to filters
  const [filters, setFilters] = useState({ search: "", year: "", result: "", rocket: "" });

  //Definition of filters
  const filteredData = (data || []).filter((launch) => {
    const matchesSearch = launch.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesYear = filters.year ? launch.date_utc.startsWith(filters.year) : true;
    const matchesResult = filters.result ? launch.success?.toString() === filters.result : true;
    const matchesRocket = filters.rocket ? launch.rocket === filters.rocket : true;

    return matchesSearch && matchesYear && matchesResult && matchesRocket;
  });

  // Show loader while fetching data
  if (loading) { 
    return <Loader />;
  }

  // Handle fetch error
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Launches</h1>

      <Filters setFilters={setFilters} />

      <div className="flex flex-wrap justify-center gap-3">
        {filteredData.map((launch: Launch) => (
          <LaunchCard key={launch.id} launch={launch} />
        ))}
      </div>
    </div>
  );
};
