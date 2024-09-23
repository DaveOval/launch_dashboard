import axios from "axios";
import { useEffect, useState } from "react";

interface Location {
    latitude: number;
    longitude: number;
}

interface Launchpad {
    id: string;
    name: string;
    coordinates: Location | null;
    location: Location; 
    latitude: number; 
    longitude: number;
}

interface UseLaunchPadsIds {
    launchpads: Launchpad[];
    loadingLaunchpads: boolean;
    errorLaunchpads: boolean;
}

export const useLaunchPadsIds = (): UseLaunchPadsIds => {
    const [launchpads, setLaunchPads] = useState<Launchpad[]>([]);
    const [loadingLaunchpads, setLoadingLaunchpads] = useState<boolean>(true);
    const [errorLaunchpads, setErrorLaunchpads] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingLaunchpads(true);
            setErrorLaunchpads(false);
            try {
                const response = await axios.get<Launchpad[]>("https://api.spacexdata.com/v4/launchpads");
                
                const launchpadData = response.data.map(({ id, name, latitude, longitude }) => ({
                    id,
                    name,
                    coordinates: { latitude, longitude },
                    location: { latitude, longitude },
                    latitude,
                    longitude
                }));
                setLaunchPads(launchpadData);
            } catch (error) {
                setErrorLaunchpads(true);
            } finally {
                setLoadingLaunchpads(false);
            }
        };

        fetchData();
    }, []);

    return { launchpads, loadingLaunchpads, errorLaunchpads };
};
