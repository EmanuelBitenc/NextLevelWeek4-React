import { createContext, useState, ReactNode, useContext } from 'react';
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

    function levelUp(){
    setLevel(level +1);
}

    function startNewChallenge(){
    const randomChallengesIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengesIndex];

    setActiveChellenge(challenge)
    }

    function resetChallenge(){
        setActiveChellenge(null);
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
        experienceToNextLevel
        }}>
        {children}
        </ChallengesContext.Provider>

    );
    
}