import axios from "axios";
import { useEffect, useState } from "react";

interface FetchResult<T> {
    data: T;
    loading: boolean;
    error: boolean;
}


export const useFetch =  <T,>(url : string ): FetchResult<T>=> {

    const [data, setData] = useState<T | null | any>(null);
    const [loading, setLoading] = useState(true);
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

        fecthData();
    }, [ url ] );

    return { data , loading, error };
}