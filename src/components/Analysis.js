import classess from '../styles/Analysis.module.css';
import Question from './Question';

export default function Analyisis({answers}) {
    return (
        <div className={classess.analysis}>
            <h1>Question Analysis</h1>
            <Question answers={answers}/>
        </div>
    );
}