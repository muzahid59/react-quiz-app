import summaryImage from '../assets/images/success.png';
import useFetchRequest from '../hooks/useFetchRequest';
import classes from '../styles/Summary.module.css';

export default function Summary({score, noq}) {
    function getKeyword() {
        const scorePercentage = (score / (noq * 5)) * 100;
        if (scorePercentage < 50) {
            return 'failed';
        } else if (scorePercentage < 70) {
            return 'good'; 
        } else if (scorePercentage < 100) {
            return 'very good';
        } else {
            return 'excellent';
        }
    }
    console.log('Pixel Api key', process.env.REACT_APP_PIXEL_API_KEY);
    const {loading, error, data} = useFetchRequest(
        `https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`,
        'GET',
        {
        'Authorization': process.env.REACT_APP_PIXEL_API_KEY, 
        }
    );
    const image = data ? data.photos[0].src.medium : summaryImage;
    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>
            {loading && (<div className={classes.badge}> Loading your badge </div>)}
            {error && (<div className={classes.badge}> Error occured ! </div>)}
            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success" />
                </div>
            )}
        </div>
    );
}   