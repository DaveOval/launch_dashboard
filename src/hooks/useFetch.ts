import axios from "axios";
import { useEffect, useState } from "react";


export const useFetch = (url : string , params: any) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState( false );


    useEffect(() => {
        const fecthData = async () => {
            try {
                const response = await axios.get(url, { params });
                setData(response.data);
            } catch (error) {
                setError( true );
            } finally {
                setLoading(false);
            }
        };

        fecthData();
    }, [url, params]);

    return { data, loading, error };
}