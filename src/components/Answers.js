import classes from '../styles/Answers.module.css';
import Checkbox from './Checkbox';

export default function Answers() {
    return (
         <div className={classes.answers}>
            <Checkbox className={classes.answer}>
                A New Hope 1
            </Checkbox>
        </div>
    );
}