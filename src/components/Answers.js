import classes from '../styles/Answers.module.css';
import Checkbox from './Checkbox';

export default function Answers({options = [], onCheck}) {
    return (
         <div className={classes.answers}>
            {
                options.map((option, index) => {
                    return <Checkbox className={classes.answer} text={option.title} onCheck={ (e) => {
                        onCheck({
                            e,
                            optionIndex: index,
                            checked: e.target.checked,
                        });
                    }} />
                })
            }
        </div>
    );
}