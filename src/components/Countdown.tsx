import { useState, useEffect} from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){
    const [time, setTime]= useState(25 *60)
    const [isActive, setIsActive] = useState(false);

    const minutes = Math.floor(time /60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight]= String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight]= String(seconds).padStart(2,'0').split('');

    function starCoultdown(){
        setIsActive(true)
    }

    useEffect(() => {
        if(isActive && time > 0) {
            setTimeout(() => {
                setTime(time -1);
            }, 1000)
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

        {isActive ? (
            <button 
            type="button" 
            className={styles.countdownButton}
            onClick={starCoultdown}
            >
            Abandonar Ciclo
            </button>
        ) : (
            <button 
        type="button" 
        className={'${styles.countdownButton} ${countdownButtonActive}'}
            onClick={starCoultdown}
            >
            Iniciar um ciclo
            </button>
        )}
    </div>
        
    );
}