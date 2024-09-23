import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks";
import { Loader } from "../components";
import useFavorite from "../hooks/useFavorites";

interface Launch {
  flight_number: number;
  name: string;
  date_utc: string;
  details: string;
  rocket: {
    rocket_name: string;
  };
  launch_site?: {
    site_id: string;
    site_name: string;
  };
  links: {
    youtube_id: string;
    wikipedia: string;
    article: string;
    patch: {
      large: string | null;
      small: string | null
    };
  };
  success: boolean;
  youtube_id: string;
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

  console.log({data})

  /* const siteName = data.launch_site?.site_name || "Lugar no encontrado";
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(siteName)}`; */

  return (
    <div className="p-6 md:p-8 bg-gray-100 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row w-full space-y-6 md:space-y-0 md:space-x-8">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold">{data.name}</h1>
            <button onClick={toggleFavorite} className={`${liked ? "text-red-500" : "text-gray-500"} transition duration-300 focus:outline-none`}>
              {liked ? "❤️ Saved to favorites" : "🤍 Add to favorites"}
            </button>
          </div>
          <h2 className="text-2xl text-gray-900 ">
            <strong>Status:</strong> { data.success ? <span className="text-green-500" >Success</span> : <span className="text-red-600" >Failed</span> }
          </h2>
          <p className="text-gray-700">
            <strong>Launch Date:</strong> {new Date(data.date_utc).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <strong>Rocket:</strong> {data.rocket.rocket_name || "No rocket"}
          </p>
          <div className="text-gray-700">
            <strong>More Info:</strong>
            <a href={data.links.wikipedia} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read on Wikipedia</a>
          </div>
          <div className="mb-5">
            <strong>SpaceX aritucle:</strong>
            <a href={data.links.article} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Read on Wikipedia</a>
          </div>
          <div>
            <p>{data.details}</p>
          </div>
        </div>
  
        <div className="bg-white shadow-md rounded-lg p-4 flex-1 flex justify-center items-center"> {/* Añadir flex aquí */}
          <img className="h-auto max-w-full rounded-md" src={`${data.links.patch.small}`} alt="image description" />
        </div>
      </div>

      <div className="flex flex-col w-full space-y-6 mt-5 p-5 h-auto">
        <div className="flex-1">
          <iframe 
            className="w-full h-64 md:h-96"  
            src={`https://www.youtube.com/embed/${data.links.youtube_id}`}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen>
          </iframe>
        </div>

        {/* <div className="flex-1">
          <iframe
            className="w-full h-64 md:h-96" 
            frameBorder="0"
            referrerPolicy="no-referrer-when-downgrade"
            src={mapSrc}
            allowFullScreen>
          </iframe>
        </div> */}
      </div>

  
      
    </div>
  );
  
};
