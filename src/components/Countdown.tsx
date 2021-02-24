import { useState, useEffect} from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown(){
    const [time, setTime]= useState(0.05 *60)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time /60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight]= String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight]= String(seconds).padStart(2,'0').split('');

    function starCoultdown(){
        setIsActive(true)
    }

    function resetCoultdown(){
        setIsActive(false);
        clearTimeout(countdownTimeout);
        setTime( 0.05 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000)
        } else if (isActive && time === 0){
            setHasFinished(true);
            setIsActive(false);
        }
    }, [isActive, time])

    return(
        <div>
        <div className={styles.countdownContainer}>
            <div>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                    <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            </div>

        {hasFinished ? (
            <button
                disabled
                className={styles.countdownButton}
            >
            Ciclo Encerrado
            </button>
        ) : (
            <>
            {isActive ? (
            <button 
                type="button" 
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                onClick={resetCoultdown}
            >
            Abandonar Ciclo
            </button>
        ) : (
            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={starCoultdown}
            >
            Iniciar um ciclo
            </button>
        )}
            </>
        ) }
    </div>   
    );
}