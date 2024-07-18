import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList() {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchVideos() {
            const db = getDatabase();
            const videoRef = ref(db, 'videos');
            const videoQuery = query(videoRef, orderByKey());

            try {
                setError('');
                setLoading(true);
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {
                    const newVidoes = Object.values(snapshot.val());
                    setVideos((previousVideos) => {
                        return [
                            ...previousVideos,
                            ...newVidoes,
                        ];
                    });
                } else {

                }

            } catch (error) {
                console.log(error);
                setError('An error occurred');
                setLoading(false);
            }   
        }
        fetchVideos();
    }, []);

    return {
        loading,
        videos,
        error,
    };
}