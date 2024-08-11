import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnsers(id) {
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        async function fetchAnswers() {
            const db = getDatabase();
            const asnwerRef = ref(db, 'answers/' + id + '/questions');
            const answerQuery = query(asnwerRef);
            try {
                setError('');
                setLoading(true);
                const snapshot = await get(answerQuery);
                setLoading(false);
                console.log('Answer snapshot', snapshot);
                if (snapshot.exists()) {
                    const newAnswers = Object.values(snapshot.val());
                    setAnswers((previousAnswers) => {
                        return [
                            ...previousAnswers,
                            ...newAnswers,
                        ];
                    });
                }
                console.log('Answers', answers);

            } catch (error) {
                console.log(error);
                setError('An error occurred');
                setLoading(false);
            }   
        }
        fetchAnswers();
    }, [id]);

    return {
        loading,
        answers,
        error,
    };
}