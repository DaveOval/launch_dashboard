import { useLocation } from "react-router-dom";
import { useFetch } from "../hooks";
import { Loader } from "../components";
import useFavorite from "../hooks/useFavorites";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
  flight_number: number;
  webcast: string;
}

export const LaunchDetails = () => {
  const launch_id = useLocation().pathname.split("/")[2];

  const { data, loading, error } = useFetch<Launch>(`https://api.spacexdata.com/v4/launches/${launch_id}`);

  // Asegúrate de que data está definido antes de pasarla al hook
  const [liked, toggleFavorite] = useFavorite(launch_id);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
          <button
            onClick={toggleFavorite}
            className={`${
              liked ? "text-red-500" : "text-gray-500"
            } transition duration-300 focus:outline-none`}
          >
            {liked ? "❤️ Guardado en favoritos" : "🤍 Agregar a favoritos"}
          </button>
        </div>
        <p className="text-gray-700 mb-4">
          <strong>Fecha de lanzamiento:</strong>{" "}
          {new Date(data.date_utc).toLocaleString()}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Número de vuelo:</strong> {data.flight_number}
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Cohete:</strong> {data.rocket}
        </p>
        <div className="mb-4">
          <strong>Webcast:</strong>{" "}
          <a
            href={data.webcast}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Ver en YouTube
          </a>
        </div>
        
        {/* Espacio para el mapa */}
        <div className="h-64 w-full bg-gray-200 flex justify-center items-center">
          <p>Mapa de Google Maps aquí</p>
        </div>
      </div>
    </div>
  );
};
