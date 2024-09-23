import { useState } from 'react';

import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

import { useFetch } from '../hooks';
import { useLaunchPadsIds } from '../hooks/useLaunchPadIds';
import { Loader } from '../components';

// Interface Launch
interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
  launchpad: string;
  details: string;
  links?: {
    article?: string;
    patch?: { //Image
      small: string
    };
  }
}

// Intercoordinates
interface Coordinates {
  lat: number; // Latitude
  lng: number;  // Longitude
}

export const Map = () => {
  //Fetch launchpad data 
  const { launchpads, loadingLaunchpads } = useLaunchPadsIds();
  //Fetch launches data
  const { data, loading, error } = useFetch<Launch[]>("https://api.spacexdata.com/v4/launches");

  //Load google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  //Sore selected launches when a markers is clicked
  const [selectedLaunches, setSelectedLaunches] = useState<Launch[]>([]);

  //Loader while fetching data
  if (loading || loadingLaunchpads) { 
    return <Loader />;
  }

  // Handle fetch error
  if (error) {
    console.error("Fetch error:", error);
    return <div>Error: {error}</div>;
  }

  // Maping launchpads to coordinates
  const launchpadCoordinates = launchpads.reduce((acc, launchpad) => {
    if (launchpad.coordinates) {
      acc[launchpad.id] = {
        lat: launchpad.latitude,
        lng: launchpad.longitude 
      };
    }
    return acc;
  }, {} as Record<string, Coordinates>);

  //Show loader until google maps API is loaded
  if (!isLoaded) {
    return <Loader />;
  }

  //Group launches by ther coordinates
  const launchesByCoordinates: Record<string, Launch[]> = {};

  //Bucle for group launches
  data?.forEach(launch => {
    const coordinates = launchpadCoordinates[launch.launchpad];
    if (coordinates) {
      const coordKey = `${coordinates.lat},${coordinates.lng}`;
      if (!launchesByCoordinates[coordKey]) {
        launchesByCoordinates[coordKey] = [];
      }
      launchesByCoordinates[coordKey].push(launch);
    }
  });

  return (
    <div className='relative w-full h-full'>
      <GoogleMap
        mapContainerClassName="absolute inset-0 w-full h-full"
        center={{ lat: 28.5721, lng: -80.648 }} 
        zoom={5}
      >
        {
          Object.entries(launchesByCoordinates).map(([coordKey, launches]) => {
            const [lat, lng] = coordKey.split(',').map(Number);

            return (
              <Marker
                key={coordKey}
                position={{ lat, lng }} 
                onClick={() => setSelectedLaunches(launches)}
              />
            );
          })
        }

        {selectedLaunches.length > 0 && (
          <InfoWindow 
            position={launchpadCoordinates[selectedLaunches[0].launchpad]} // Obtiene las coordenadas del launchpad
            onCloseClick={() => setSelectedLaunches([])}
          >
            <div className="p-2 bg-white rounded-lg shadow-lg">
              <h4 className="text-lg font-bold">Lanzamientos</h4>
              {selectedLaunches.map(launch => (
                <div key={launch.id} className="mt-2">
                  <h5 className="font-semibold text-lg">{launch.name}</h5>
                  <p className="text-sm text-gray-600">{new Date(launch.date_utc).toLocaleDateString()}</p>
                  {launch.links?.patch && (
                    <img src={launch.links.patch.small} alt={`${launch.name} patch`} className="my-2 w-32 h-auto" />
                  )}
                  {launch.links?.article && (
                    <a href={launch.links.article} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      Leer artículo
                    </a>
                  )}
                  <Link to={`/launch/${launch.id}`} className="block mt-1 text-blue-600 hover:underline">
                    Ver más
                  </Link>
                </div>
              ))}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
