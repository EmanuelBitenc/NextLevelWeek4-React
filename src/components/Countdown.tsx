import { useState, useEffect, useContext} from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown(){

    const { 
        minutes, 
        seconds, 
        hasFinished,
        isActive, 
        starCoultdown, 
        resetCoultdown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight]= String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight]= String(seconds).padStart(2,'0').split('');

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
            Ciclo Encerrado <img className={styles.img} src="../complete.webp" width="20" alt="Completo" />
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