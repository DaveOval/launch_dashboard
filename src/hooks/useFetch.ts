import axios from "axios";
import { useEffect, useState } from "react";


export const useFetch = (url : string ) => {

    const [data, setData] = useState([]);
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

    return { data, loading, error };
}