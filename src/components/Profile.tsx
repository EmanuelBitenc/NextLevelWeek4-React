import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/EmanuelBitenc.png" alt="Emanuel Bitencourt"/>
            <div>
                <strong>Emanuel Bitencourt</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 999
                </p>
            </div>

        </div>
    )
}