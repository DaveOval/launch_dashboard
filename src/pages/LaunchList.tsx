import { useState } from "react";
import { Filters, LaunchCard, Loader } from "../components";
import { useFetch } from "../hooks";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
}

export const LaunchList = () => {

  const { data, loading, error } = useFetch<Launch[]>("https://api.spacexdata.com/v4/launches");
  const [filters, setFilters] = useState({ search: "", year: "", result: "", rocket: "" });

  const filteredData = (data || []).filter((launch) => {
    const matchesSearch = launch.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesYear = filters.year ? launch.date_utc.startsWith(filters.year) : true;
    const matchesResult = filters.result ? launch.success?.toString() === filters.result : true;
    const matchesRocket = filters.rocket ? launch.rocket === filters.rocket : true;

    return matchesSearch && matchesYear && matchesResult && matchesRocket;
  });

  if (loading) { 
    return <Loader />;
  }

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
