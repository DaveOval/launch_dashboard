import { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useFetch } from '../hooks';
import { useLaunchPadsIds } from '../hooks/useLaunchPadIds';
import { Loader } from '../components';
import { Link } from 'react-router-dom';

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
    patch?: {
      small: string
    };
  }
}

interface Coordinates {
  lat: number;
  lng: number;
}

export const Map = () => {
  const { launchpads, loadingLaunchpads } = useLaunchPadsIds();
  const { data, loading, error } = useFetch<Launch[]>("https://api.spacexdata.com/v4/launches");
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [selectedLaunches, setSelectedLaunches] = useState<Launch[]>([]);

  if (loading || loadingLaunchpads) { 
    return <Loader />;
  }

  if (error) {
    console.error("Fetch error:", error);
    return <div>Error: {error}</div>;
  }

  const launchpadCoordinates = launchpads.reduce((acc, launchpad) => {
    if (launchpad.coordinates) {
      acc[launchpad.id] = {
        lat: launchpad.latitude,
        lng: launchpad.longitude 
      };
    }
    return acc;
  }, {} as Record<string, Coordinates>);

  if (!isLoaded) {
    return <Loader />;
  }

  const launchesByCoordinates: Record<string, Launch[]> = {};

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
                <div key={launch.id}>
                  <h5 className="font-semibold">{launch.name}</h5>
                  <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
                  {launch.links?.patch && (
                    <img src={launch.links.patch.small} alt={`${launch.name} patch`} className="my-2 w-32" />
                  )}
                  {launch.links?.article && (
                    <a href={launch.links.article} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      Leer artículo
                    </a>
                  )}
                  <Link to={`/launch/${launch.id}`}>
                    See more
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
