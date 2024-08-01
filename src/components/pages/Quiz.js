import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import useQuestionList from '../../hooks/useQuestionList';
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
    const {loading, questions, error} = useQuestionList(id);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [qna, dispatch ] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({
            type: 'questions',
            value: questions,
        });
        console.log('questions',questions);
    }, [questions]);

    function handleAnswerOnCheck(e, optionIndex) {
        console.log('checkbox', e.target.checked);
        dispatch({
            type: 'answer',
            questionId: currentQuestion,
            optionId: optionIndex,
            value: e.target.checked,
        });
    }
    function nextQuestion() {
        if (currentQuestion + 1 < questions.length ) {
            setCurrentQuestion(currentQuestion + 1);
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
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
                <Answers options={qna[currentQuestion].options} handleChange={handleAnswerOnCheck}/>
                <ProgressBar next={nextQuestion} prev={prevQuestion} progress={progress} />
                <MiniPlayer /> 
             </>
        )}
        </>
    );
}