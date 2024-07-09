import classess from '../styles/Analysis.module.css';
import Question from './Question';

export default function Analyisis() {
    return (
        <div class={classess.analysis}>
                <h1>Question Analysis</h1>
                <h4>You answerd 5 out of 10 questions correctly</h4>
                <Question />
                <Question />
            </div>
    );
}