import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import challenges from '../../challenges.json';

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
}

interface ChallengesProviderProps{
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({children}: ChallengesProviderProps){
    const [level,setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] =useState(0);

    const [activeChallenge, setActiveChellenge] = useState(null)

    const experienceToNextLevel = Math.pow((level +1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp(){
    setLevel(level +1);
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
        completeChallenge
        }}>
        {children}
        </ChallengesContext.Provider>

    );
    
}