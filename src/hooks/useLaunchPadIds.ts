import { useEffect, useState } from "react";
import axios from "axios";

// Interface Location object
interface Location {
    latitude: number;
    longitude: number;
}

// Interface Launchpad object
interface Launchpad {
    id: string;
    name: string;
    coordinates: Location | null;
    location: Location; 
    latitude: number; 
    longitude: number;
}

// Interface useLaunchPadsIds hook
interface UseLaunchPadsIds {
    launchpads: Launchpad[];
    loadingLaunchpads: boolean;
    errorLaunchpads: boolean;
}

export const useLaunchPadsIds = (): UseLaunchPadsIds => {
    //State for launchpads
    const [launchpads, setLaunchPads] = useState<Launchpad[]>([]);
     // State for loading status
    const [loadingLaunchpads, setLoadingLaunchpads] = useState<boolean>(true);
    // State for error status
    const [errorLaunchpads, setErrorLaunchpads] = useState<boolean>(false);

    useEffect(() => {
        // Function to fetch launchpad data
        const fetchData = async () => {
            //Setting before fetching
            setLoadingLaunchpads(true);
            setErrorLaunchpads(false);
            try {
                //HTTP GET request
                const response = await axios.get<Launchpad[]>("https://api.spacexdata.com/v4/launchpads");
                
                // Map the response data to the required launchpad structure
                const launchpadData = response.data.map(({ id, name, latitude, longitude }) => ({
                    id,
                    name,
                    coordinates: { latitude, longitude },
                    location: { latitude, longitude },
                    latitude,
                    longitude
                }));
                // Update state with the fetched launchpad data
                setLaunchPads(launchpadData);
            } catch (error) {
                setErrorLaunchpads(true);
            } finally {
                setLoadingLaunchpads(false);
            }
        };

        //Call the function
        fetchData();
    }, []);

    // Return the launchpads data, loading state, and error state
    return { launchpads, loadingLaunchpads, errorLaunchpads };
};
