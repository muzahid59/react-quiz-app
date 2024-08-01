import classes from '../styles/ProgressBar.module.css';
import Button from "./Button";

export default function ProgressBar({next, prev, progress}) {
    return (
        <div className={classes.progressBar}>
                <div className={classes.backButton} onClick={prev}>
                        <span className="material-icons-outlined"> arrow_back </span>
                </div>
                <div className={classes.rangeArea}>
                    <div className={classes.tooltip}>24% Cimplete!</div>
                    <div className={classes.rangeBody}>
                        <div className={classes.progress} style={{width: `${progress}%`}}></div>
                    </div>
                </div>
                    <Button className={classes.next} onClick={next}>
                        <span>Next Question</span>
                        <span className="material-icons-outlined"> arrow_forward </span>
                    </Button>
            </div>
    );
}