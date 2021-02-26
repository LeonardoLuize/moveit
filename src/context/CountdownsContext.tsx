import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData {

    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => {};
    resetCountdown: () => {};

}



export const CountdownContext = createContext({} as CountdownContextData);

interface CountdownProviderProps {
    children: ReactNode;

  
}

export function CountdownProvider({children}: CountdownProviderProps){


    const {startNewChallenge} = useContext(ChallengeContext);

    let countdownTimeOut: NodeJS.Timeout;

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor( time / 60 );
    const seconds = time % 60;

    function startCountdown(){

        setIsActive(true);

    }

    function resetCountdown(){
        clearTimeout(countdownTimeOut);
        setIsActive(false);

        setTime(0.1 * 60);
        setHasFinished(false);
    }

    useEffect(() =>{
        if(isActive && time > 0){
            countdownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        }else if(isActive && time == 0){
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
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    );
}

