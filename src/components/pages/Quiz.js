import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import useQuestions from '../../hooks/useQuestions';
import Answers from '../Answers';
import MiniPlayer from '../MiniPlayer';
import ProgressBar from '../ProgressBar';

const initialState = null;

const reducer = (state, action) => {
    switch (action.type) {
        case 'questions':
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                }); 
            });
            return action.value;
        case 'answer':
            const questions = _.cloneDeep(state);
            questions[action.questionId].options[action.optionId].checked = action.value
            return questions
        default:
            return state;
    }
}

export default function Quiz() {
    const {id} = useParams();
    const {loading, questions, error} = useQuestions(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [qna, dispatch ] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions,
        });
        console.log('questions',questions);
    }, [questions]);

    function handleAnswerOnCheck(e, optionIndex) {
        dispatch({
            type: 'answer',
            questionId: currentQuestion,
            optionId: optionIndex,
            value: e.target.checked,
        });
    }
    function nextQuestion() {
        if (currentQuestion + 1 < questions.length ) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            setCurrentQuestion((prevQuestion) => prevQuestion - 1);
        }
    }

    async function handleSubmit() {
        console.log('currentUser', currentUser);
        const {uid} = currentUser; 
        const db = getDatabase(); 
        const resultRef = ref(db, `result/${uid}/${id}`);
        await set(resultRef, qna);
        navigate(`/result/${id}`, {state:{qna}});
    }

    const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    return (
        <>
        {loading && <div> Loading...</div>}
        {error && <div> There was an error!</div>}
        {!loading && !error && qna && qna.length > 0 && (
            <>
                <h1>{ qna[currentQuestion].title }</h1>
                <h4>Question can have multiple answers</h4>
                <Answers options={qna[currentQuestion].options} handleChange={handleAnswerOnCheck} input={true}/>
                <ProgressBar next={nextQuestion} prev={prevQuestion} handleSubmit={handleSubmit} progress={progress} />
                <MiniPlayer id={id} tittle={qna[currentQuestion].title} /> 
             </>
        )}
        </>
    );
}