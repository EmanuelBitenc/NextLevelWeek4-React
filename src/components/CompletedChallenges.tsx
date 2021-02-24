import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallegens.module.css';

export function CompletedChallegens(){

    const {challengesCompleted} = useContext(ChallengesContext);

    return(
        <div className={styles.completedChallegensContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}