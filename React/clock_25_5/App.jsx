"use strict";

import React, {
  StrictMode,
  useState,
  createContext,
  useContext,
  useEffect,
  useRef  
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";


function App(){
    //later change to -> break:5, session:25
    const [status, setStatus] = useState({
        break:1,
        session:1,
        currentSegment: 'Session',
        break_date: new Date('2023-11-26T00:05:00'),
        session_date: new Date('2023-11-26T00:25:00'),
        displayTime:"25:00",
        isPlaying:false
    })

    let sessionInt = null

    const alarm = useRef()
    const start_stop = useRef()


    function upwards_break(){
        if (status.break == 60) return
        const auxdate = new Date( status.break_date.setHours(0,status.break+1,0,0) )
        const currentState = {  ...status , break:status.break+1, break_date:auxdate }
        setStatus(currentState)
        console.log(status.break_date)
    }

    function downwards_break(){
        if (status.break == 1) return
        const auxdate = new Date( status.break_date.setHours(0,status.break-1,0,0) )
        const currentState =  { ...status , break:status.break-1, break_date:auxdate }
        setStatus(currentState)
        console.log(status.break_date)
    }

    function upwards_session(){
        if (status.session == 60) return
        const auxdate = new Date( status.session_date.setHours(0,status.session+1,0,0) )
        const currentState = {  ...status , session:status.session+1, session_date:auxdate, displayTime:`${auxdate.toUTCString().slice(20,25)}`}
        setStatus(currentState)
        console.log(status.session_date)
    }

    function downwards_session(){
        if (status.session == 1) return
        const auxdate = new Date( status.session_date.setHours(0,status.session-1,0,0) )
        const currentState = {  ...status , session:status.session-1, session_date:auxdate,  displayTime:`${auxdate.toUTCString().slice(20,25)}`}
        setStatus(currentState)
        console.log(status.session_date)
    }

    function reset_button(){
        const currentState = {
            break:5,
            session:25,
            currentSegment: 'Session',
            break_date: new Date('2023-11-26T00:05:00'),
            session_date: new Date('2023-11-26T00:25:00'),
            displayTime:"25:00",
            isPlaying:false
        }

        clearInterval(sessionInt)
        sessionInt=null

        setStatus(currentState)
        console.log(status)
    }


    function session_countdown(){

        const auxdate = new Date(status.session_date.setSeconds(status.session_date.getSeconds() - 1));
        const newstate = { ...status,
               session_date: auxdate,
               displayTime : `${auxdate.getMinutes().toString().padStart(2,'0')}:${auxdate.getSeconds().toString().padStart(2,'0')}`
        }

            console.log(newstate.displayTime)


        setStatus(newstate)
        if (newstate.displayTime == "00:00"){alarm.current.play();clearInterval(sessionInt);sessionInt=null }
    }


    function pause(){
        clearInterval(sessionInt)
        sessionInt=null
    }

    function set_on_off(){
        setStatus({...status, isPlaying:!status.isPlaying});
        play_pause()
    }

    function play_pause(){
        // console.log(status.isPlaying)
        if (status.isPlaying){
            // setStatus({...status, isPlaying:status.isPlaying })
            if (!sessionInt) sessionInt=setInterval(session_countdown, 1000)
        } else {
            pause()
        }
    }





    useEffect(()=>{
    // if (!status.IsPlaying) return
    console.log(status.isPlaying)

    // start_stop.current.addEventListener('click', set_on_off) 

    return ()=>{

    pause()
    // start_stop.current.removeEventListener("click", set_on_off) 
    
    }

    }, [setStatus, status ])


    return (<>

    <div     id="break-label"                                      >Break Length</div>
    <button  id="break-increment"   onClick={upwards_break  }      ><i className="bi bi-caret-up"></i></button> 
    <button  id="break-decrement"   onClick={downwards_break}      ><i className="bi bi-caret-down-fill"></i></button>
    <div     id="break-length"                                     >{status.break}</div> 

    <div     id="session-label"                                    >Session Length</div>
    <button  id="session-increment" onClick={upwards_session  }    ><i className="bi bi-caret-up"></i></button> 
    <button  id="session-decrement" onClick={downwards_session}    ><i className="bi bi-caret-down-fill"></i></button>
    <div     id="session-length"                                   >{status.session}</div> 

    <div id="timer-label">{status.currentSegment}</div>
    <div id="time-left">{status.displayTime}</div>
    <button id="start_stop" ref={start_stop} onClick={set_on_off} ><i className={status.isPlaying? "bi bi-stop-fill":"bi bi-play-fill" }></i></button>
    <button id="reset" onClick={reset_button} ><i className="bi bi-arrow-clockwise"></i></button>
    <audio ref={alarm} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg" id="beep"></audio>
        </>)
}

createRoot(document.getElementById("root")).render(<App />);
