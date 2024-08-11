import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import classes from '../styles/MiniPlayer.module.css';

export default function MiniPlayer({id, tittle}) {
    const buttonRef = useRef();
    const [open, setOpen] = useState(false);
    const videUrl = `https://wwww.youtube.com/watch?v=${id}`;

    function togglePlayer() {
        if (open) {
            setOpen(false);
            buttonRef.current.classList.remove(classes.floatingBtn);            
        } else {
            setOpen(true);
            buttonRef.current.classList.add(classes.floatingBtn);
        }
    }

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={togglePlayer} >
                <span className={`material-icons-outlined ${classes.open} `}> play_circle_filled </span>
                <span 
                    className={`material-icons-outlined ${classes.close}`}
                    onClick={togglePlayer}
                > close </span>
                <ReactPlayer 
                    url={videUrl} 
                    width="300px" 
                    height="168px" 
                    controls
                    playing={!open}  
                    className={classes.player} 
                />
                <p>{tittle}</p>
        </div>  
    );
}