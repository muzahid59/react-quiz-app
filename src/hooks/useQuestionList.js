import { get, getDatabase, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestionList(videoID) {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState();
    useEffect(() => {
        async function fetchQuestions() {
            console.log('fetchquestions');
            const db = getDatabase();
            const questionRef = ref(db, 'quiz/' + videoID + '/questions');
            const questionQuery = query(questionRef);
            try {
                setError('');
                setLoading(true);
                const snapshot = await get(questionQuery);
                setLoading(false);
                console.log('question snapshot', snapshot);
                if (snapshot.exists()) {
                    const newQuestions = Object.values(snapshot.val());
                    setQuestions((previousQuestions) => {
                        return [
                            ...previousQuestions,
                            ...newQuestions,
                        ];
                    });
                }

            } catch (error) {
                console.log(error);
                setError('An error occurred');
                setLoading(false);
            }   
        }
        fetchQuestions();
    }, [videoID]);

    return {
        loading,
        questions,
        error,
    };
}