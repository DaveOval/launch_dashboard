import { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useFetch } from '../hooks';
import { useLaunchPadsIds } from '../hooks/useLaunchPadIds';
import { Loader } from '../components';

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  rocket: string;
  launchpad: string; // Make sure this property exists
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

  const [selectedLaunch, setSelectedLaunch] = useState<Launch | null>(null);

  if (loading || loadingLaunchpads) { 
    return <Loader />;
  }

  if (error) {
    console.error("Fetch error:", error);
    return <div>Error: {error}</div>;
  }

  // Create an object for easy access to launchpad coordinates
  const launchpadCoordinates = launchpads.reduce((acc, launchpad) => {
    if (launchpad.coordinates) {
      acc[launchpad.id] = {
        lat: launchpad.coordinates.latitude, // Ensure this matches your API structure
        lng: launchpad.coordinates.longitude // Ensure this matches your API structure
      };
    }
    return acc;
  }, {} as Record<string, Coordinates>);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <div className='relative w-full h-[500px]'>
      <GoogleMap
        mapContainerClassName="absolute inset-0"
        center={{ lat: 28.5721, lng: -80.648 }} // Default center of the map
        zoom={5}
      >
        {
          data?.map((launch) => {
            const coordinates = launchpadCoordinates[launch.launchpad];

            if (!coordinates) {
              return null; // Skip markers without coordinates
            }

            return (
              <Marker
                key={launch.id}
                position={coordinates} // This should now match the expected type
                onClick={() => setSelectedLaunch(launch)}
              />
            );
          })
        }

        {selectedLaunch && (
          <InfoWindow 
            position={launchpadCoordinates[selectedLaunch.launchpad]} // Now using the correct type
            onCloseClick={() => setSelectedLaunch(null)}
          >
            <div className="p-2 bg-white rounded-lg shadow-lg">
              <h4 className="text-lg font-bold">{selectedLaunch.name}</h4>
              <p className="text-sm">Fecha: {new Date(selectedLaunch.date_utc).toLocaleDateString()}</p>
              <p className={`text-sm font-semibold ${selectedLaunch.success ? 'text-green-500' : 'text-red-500'}`}>
                {selectedLaunch.success ? 'Éxito' : 'Fallo'}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
