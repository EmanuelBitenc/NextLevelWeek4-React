import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{
    minutes:number;
    seconds:number;
    hasFinished:boolean;
    isActive:boolean;
    starCoultdown : () => void;
    resetCoultdown: () => void;
}

interface ContdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

 let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children}: ContdownProviderProps){
    
    const {startNewChallenge} = useContext(ChallengesContext);

    const [time, setTime]= useState(0.05 *60)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time /60);
    const seconds = time % 60;

    function starCoultdown(){
        setIsActive(true)
    }

    function resetCoultdown(){
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
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
            startNewChallenge();
        }
    }, [isActive, time])
    
    
    return(
        <CountdownContext.Provider value={{
            minutes, 
            seconds,
            hasFinished,
            isActive,
            starCoultdown,
            resetCoultdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}