import { useEffect, useState } from "react";
import axios from "axios";

// Interface fetch result
interface FetchResult<T> {
    data: T; // feneric type T
    loading: boolean;
    error: boolean;
}

export const useFetch =  <T,>(url : string ): FetchResult<T>=> {
    // State to store the fetched data, initially null
    const [data, setData] = useState<T | null | any>(null);
    // State to indicate loading status, initially true
    const [loading, setLoading] = useState(true);
    // State to indicate error status, initially false
    const [error, setError] = useState( false );

    useEffect(() => {
        const fecthData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get( url );
                setData(response.data);
            } catch (error) {
                setError( true );
            } finally {
                setLoading(false);
            }
        };

        // Call the function
        fecthData();
    }, [ url ] ); // Dependency array: effect runs again if the URL changes

    // Return the fetched data, loading state, and error state
    return { data , loading, error };
}