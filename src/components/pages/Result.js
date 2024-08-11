import _ from 'lodash';
import { useLocation, useParams } from 'react-router-dom';
import useAnsers from '../../hooks/useAnswers';
import Analyisis from '../Analysis';
import Summary from '../Summary';

export default function Result() {
    const { id } = useParams();
    const location = useLocation();
    const qna = location.state.qna;
    const {loading, answers, error} = useAnsers(id);
    console.log('answers', answers);
    console.log('qna', qna);
    console.log('question id', id);

    function calculateScore() {
        let score = 0;
        answers.forEach((question, index1) => {
            const correctIndexs = [];
            const checkIndexs = [];
            question.options.forEach((option, index2) => {
                if (option.correct) correctIndexs.push(index2);
                if (qna[index1].options[index2].checked) {
                    checkIndexs.push(index2);
                    option.checked = true;
                }
            });
            if (_.isEqual(correctIndexs, checkIndexs)) score = score + 5;
        });
        return score;
    }

    const score = calculateScore();

    return (
        
        <>
        { loading && <div>Loading...</div> }
        { error && <div>Something went wrong</div> }
        {answers && answers.length > 0 && (
            <>
                <Summary score={score} noq={answers.length} />
                <Analyisis answers={answers} />
            </>
        )}
        </>
        
    );
}