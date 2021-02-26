import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { Countdown } from '../components/Countdown';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}


interface ChallengesContextData{
    level:number;
    levelUp: () =>void;
    currentExperience:number;
    challengesCompleted: number;
    startNewChallenge: () => void;
    activeChallenge: Challenge;
    resetChallenge: () => void;
    experienceToNextLevel:number;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level:number;
    currentExperience:number;
    challengesCompleted:number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children, ...rest
}:ChallengesProviderProps){
    const [level,setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] =useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChellenge] = useState(null)

    const [isLeveUpModalOpen, setIsLeveUpModalOpen]= useState(false)

    const experienceToNextLevel = Math.pow((level +1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, currentExperience, challengesCompleted]);

    function levelUp(){
    setLevel(level +1);
    setIsLeveUpModalOpen(true);

}

    function closeLevelUpModal(){
        setIsLeveUpModalOpen(false);
    }

    function startNewChallenge(){
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengesIndex];

    new Audio('/notification.mp3').play();

    if(Notification.permission=== 'granted'){
        new Notification('Novo Desafio 💥', {
            body:`Valendo ${challenge.amount}Xp!`
        })
    }

    setActiveChellenge(challenge)
    }

    function resetChallenge(){
        setActiveChellenge(null);
    }

    function completeChallenge(){
        if (!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;
        let finalExperience = currentExperience +amount;

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        
        setCurrentExperience(finalExperience);
        setActiveChellenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return(
        <ChallengesContext.Provider 
        value={{
        level, 
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal
        }}>
        {children}
        {isLeveUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>

    );
    
}