import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks";
import { Loader } from "../components";
import useFavorite from "../hooks/useFavorites";

interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_utc: string;
  rocket: {
    rocket_name: string;
  };
  launch_site?: {
    site_id: string;
    site_name: string;
  };
  links: {
    video_link: string;
    wikipedia: string;
  };
}

export const LaunchDetails = () => {
  const launch_id = useLocation().pathname.split("/")[2];
  const { data, loading, error } = useFetch<Launch>(`https://api.spacexdata.com/v4/launches/${launch_id}`);
  const [liked, toggleFavorite] = useFavorite(launch_id);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const siteName = data.launch_site?.site_name || "Lugar no encontrado";

  console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(siteName)}`;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4">{data.mission_name}</h1>
          <button onClick={toggleFavorite} className={`${liked ? "text-red-500" : "text-gray-500"} transition duration-300 focus:outline-none`}>
            {liked ? "❤️ Saved to favorites" : "🤍 Add to favorites"}
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Launch Date:</strong> {new Date(data.launch_date_utc).toLocaleString()}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Rocket:</strong> {data.rocket.rocket_name}
        </p>
        <div className="mb-4">
          <strong>Watch the Launch:</strong>
          <a href={data.links.video_link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Watch on YouTube</a>
        </div>
        <div className="mb-4">
          <strong>More Info:</strong>
          <a href={data.links.wikipedia} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read on Wikipedia</a>
        </div>
        
        {/* Google Maps embed using site name */}
        <div className="h-64 w-full bg-gray-200 flex justify-center items-center">
          <iframe
            width="450"
            height="250"
            frameBorder="0"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
            allowFullScreen>
          </iframe>
        </div>
      </div>
    </div>
  );
};
