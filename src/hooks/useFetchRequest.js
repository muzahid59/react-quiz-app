import { useEffect, useState } from "react";

 export default function useFetchRequest(url, method, headers) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        async function fethcRequest() {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(url, {
                    method: method || 'GET',
                    headers: headers,
                });
                const data = await response.json();
                setLoading(false);
                setData(data);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(error);
            }
        }

        fethcRequest();

    }, []); 

    return {
        loading,
        error,
        data,
    };
 }