import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from "firebase/database";
import { useEffect, useState } from "react";

export default function useVideoList(page) {
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState();
    const [hasMore, setHasMore] = useState(true);  

    useEffect(() => {
        async function fetchVideos() {
            const db = getDatabase();
            const videoRef = ref(db, 'videos');
            const videoQuery = query(videoRef, orderByKey(), startAt("" + page), limitToFirst(8));
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
                    setHasMore(false);
                }

            } catch (error) {
                console.log(error);
                setError('An error occurred');
                setLoading(false);
            }   
        }
        fetchVideos();
    }, [page]);

    return {
        loading,
        videos,
        error,
        hasMore,
    };
}