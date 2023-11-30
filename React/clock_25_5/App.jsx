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

function Buttons({p}){

    return (<>

    <div     id={p.label}>{p.title}</div>
    <button  id={p.up}   onClick={()=>p.upwards(p)}   ><i className="bi bi-caret-up"></i></button> 
    <button  id={p.down} onClick={()=>p.downwards(p)} ><i className="bi bi-caret-down-fill"></i></button>
    <div     id={p.len}>{p.count}</div> 

        </>)
}


function Timer({t}){
    //TODO: May need to add some logic here. Some date object, setTimeout n' sheit

    return (<>
        <div id="timer-label">{t.timerLabel}</div>
        <div id="time-left">{t.displayTime}</div>
        <button ref={t.timeleft} id="testingout">testing</button>
        <button id="start_stop"  onClick={()=>t.play_pause(t)}><i className={ t.playButton }></i></button>
        <button id="reset" ><i className="bi bi-arrow-clockwise"></i></button>
        <audio ref={t.alarm} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg" id="beep"></audio>
        </>)
}




function App() {

// +1 to counter
function upwards(p){
    if (p.count == 60) return
    p.setter(p.count + 1)
    p.setDisplay(`${ p.count +1 }:00`)


    let today = new Date()
    startDate.setHours(0,p.count+1, 0,0)
    // setStartDate(today)

    console.log(startDate)
}

// -1 to counter 
function downwards(p){
    if (p.count ==1) return
    p.setter(p.count - 1)
    p.setDisplay(`${ p.count -1 }:00`)
}

function play_pause(t){
    console.log(t.isPlaying)

    if ( !t.isPlaying ) {
        t.setPlayButton("bi bi-stop-circle") 
        t.setIsPlaying(true)
    }

    if ( t.isPlaying ) {
        t.setPlayButton("bi bi-play-fill") 
        t.setIsPlaying(false)

    }
}

// const [breakTime, setBreak] = useState(5)
const [breakTime, setBreak] = useState(1) //for testing
// const [sessionTime, setSession] = useState(25)
const [sessionTime, setSession] = useState(1) //for testing
//
const [displayTime, setDisplay] = useState("25:00") //for testing
//
const alarm = useRef()
const timeleft = useRef()
const bre={title:"Break Length", label:"break-label", up:"break-increment", down:"break-decrement", len:"break-length",           count:breakTime, upwards:upwards, downwards:downwards, setter:setBreak, setDisplay:setDisplay, displayTime:displayTime}
const ses={title:"Session Length", label:"session-label", up:"session-increment", down:"session-decrement", len:"session-length", count:sessionTime, upwards:upwards, downwards:downwards, setter:setSession, setDisplay:setDisplay, displayTime:displayTime}

const [playButton, setPlayButton] = useState("bi bi-play-fill")
const [timerLabel, setTimerLabel] = useState("Session")
const [isPlaying, setIsPlaying]   = useState(false)

let session_countdown;
let break_countdown;
const tim={isPlaying:isPlaying, setIsPlaying:setIsPlaying, label:"Session", playButton:playButton, setPlayButton:setPlayButton, timerLabel:timerLabel, setTimerLabel:setTimerLabel, play_pause:play_pause, sessionTime:sessionTime, breakTime:breakTime, setDisplay:setDisplay, displayTime:displayTime, alarm:alarm, break_countdown:break_countdown, session_countdown:session_countdown, timeleft:timeleft}

let onoff = false;
let output;
function today(){
    const today = new Date();
    today.setHours(0, sessionTime, 0, 0);
    return today
}
const [startDate, setStartDate]= useState( today() );
// const [stored, setStored]= useState( new Date() );
useEffect(()=>{

    let session_countdown;
    let break_countdown;

    timeleft.current.addEventListener("click", ()=>{
    onoff=!onoff;
    console.log(onoff)

    function timer_session(){
        setTimerLabel("Session")

        function countDownSession() {
            if (!onoff) { console.log("Session Stopped!!"); clearing(); }

            startDate.setSeconds(startDate.getSeconds() - 1);
            output = `${startDate.getMinutes().toString().padStart(2,'0')}:${startDate.getSeconds().toString().padStart(2,'0')}`
            setDisplay(output)
            console.log(output + "ongoing session") 

            
            if (output == "00:00"){ console.log("yeahh!!!"); clearInterval(session_countdown); session_countdown=null; alarm.current.play()
               if (!break_countdown) {
                   startDate.setHours(0,breakTime,0,0)
                   timer_break();
               };
            }; 
        };

        // Use setInterval to call the countdown function every 1000 milliseconds (1 second)
        if (!session_countdown) session_countdown = setInterval(countDownSession, 1000);

    }



    function timer_break(){
        setTimerLabel("Break")

        function countDownBreak() {
            if (!onoff) { console.log("Break Stopped!!"); clearing(); }

            startDate.setSeconds(startDate.getSeconds() - 1);
            output = `${startDate.getMinutes().toString().padStart(2,'0')}:${startDate.getSeconds().toString().padStart(2,'0')}`
            setDisplay(output)
            console.log(output + "inbreak") 
            
            if (output == "00:00"){ console.log("yeahh!!!"); clearInterval(break_countdown); break_countdown=null; alarm.current.play()
                if (!session_countdown) { 
                    startDate.setHours(0,sessionTime,0,0)
                    timer_session();
                }                
            }; 
        };

        // Use setInterval to call the countdown function every 1000 milliseconds (1 second)
        if (!break_countdown) break_countdown = setInterval(countDownBreak, 1000);

    }



    function clearing (){
        clearInterval(session_countdown)
        session_countdown=null
        clearInterval(break_countdown)
        break_countdown=null
        console.log("Stop!")
    }


    // if (timerLabel == "Session"){
    //     console.log("is now on session")
    //     timer_session()
    // }


    // if (timerLabel == "Break"){
    //     console.log("is now on break")
    //     timer_break()
    // }



    if (timerLabel == "Session"){
        clearing()
        console.log("is now on session")
        if(!session_countdown) {timer_session()} 
        if(!onoff) {clearing()}
    }


    if (timerLabel == "Break"){
        clearing()
        console.log("is now on break")
        if(!break_countdown) {timer_break()} 
        if(!onoff) {clearing()}
    }
        //
        //
        //

    // if (timerLabel == "Session" && !session_countdown){timer_session()}

    // if (timerLabel == "Break" && break_countdown){clearing_break()}
    // if (timerLabel == "Break" && !break_countdown){timer_break()} 

    // if (timerLabel == "Session" && !session_countdown){ timer_session() } else {clearing_session()}
    // if (timerLabel == "Break" && !break_countdown){ timer_break() } else {clearing_break()}

    // if (!session_countdown) { timer_session() } else {clearing_session()}

    // if (!session_countdown && break_countdown) { clearing_break()}


    })





}, [startDate, timerLabel, onoff])


return (<>
<Buttons p={bre}/>
<Buttons p={ses}/>
<Timer   t={tim}/>

    </>)}
createRoot(document.getElementById("root")).render(<App />);
