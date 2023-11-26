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
        <div id="time-left">{t.sessionTime}</div>
        <button id="start_stop"  onClick={()=>t.play_pause(t)}><i className={ t.playButton }></i></button>
        <button id="reset" ><i className="bi bi-arrow-clockwise"></i></button>
        <audio id="beep"/>
        </>)
}




function App() {

function upwards(p){
    if (p.count == 60) return
    p.setter(p.count + 1)
}

function downwards(p){
    if (p.count ==1) return
    p.setter(p.count - 1)
}

// function delay(t){
//     const min = 60000

//     // const d = new Date()
//     // // const now = {min:d.getMinutes(), sec:d.getSeconds()}
    
//     // const break_delay   = new Date( d.getTime() + min*t.breakTime )
//     // const session_delay = new Date( d.getTime() + min*t.sessionTime )

//     // const b = break_delay.getTime() - d.getTime()
//     // const s = session_delay.getTime() - d.getTime()
//     const m = moment()
//     const a = m.format('mm:ss')
//     const b = m.add(5, 'minutes').format('mm:ss') //change integer by break/session delay

//     console.log(a)
//     console.log(b)

//     return {break:t.breakTime*60000, session:t.sessionTime*60000}

//     // {min:break_delay.getMinutes(), sec:break_delay.getSeconds()}
//     // {min:session_delay.getMinutes(), sec:session_delay.getSeconds()} 


// }

function play_pause(t){

    const m = moment()
    const _break   = m.add(t.breakTime, 'minutes').format('mm:ss') //change integer by break/session delay
    const _session = m.add(t.sessionTime, 'minutes').format('mm:ss') //change integer by break/session delay
    console.log(_break + " vs " + _session)
    

    function myTimer() {
        const m = moment().format('mm:ss')
        console.log(m);
        if (_break==m) {
            console.log("heyyyy!")
            clearInterval(myvar)
        }

    }

    let myvar = setInterval(myTimer, 1000);

    if ( !t.isPlaying ) {
        t.setPlayButton("bi bi-stop-circle") 
        // t.setTimerLabel("Break")
        t.setIsPlaying(true)
        //setting timer
        setTimeout(()=>{
            // console.log(`${ now_str } && ${break_}`)
            console.log("Hey!")
        }, 1000)
    }

    if ( t.isPlaying ) {
        t.setPlayButton("bi bi-play-fill") 
        // t.setTimerLabel("Session")
        t.setIsPlaying(false)
    }
}

const [breakTime, setBreak] = useState(5)
const [sessionTime, setSession] = useState(25)
const bre={title:"Break Length", label:"break-label", up:"break-increment", down:"break-decrement", len:"break-length",           count:breakTime, upwards:upwards, downwards:downwards, setter:setBreak}
const ses={title:"Session Length", label:"session-label", up:"session-increment", down:"session-decrement", len:"session-length", count:sessionTime, upwards:upwards, downwards:downwards, setter:setSession}

const [playButton, setPlayButton] = useState("bi bi-play-fill")
const [timerLabel, setTimerLabel] = useState("Session")
const [isPlaying, setIsPlaying]   = useState(false)
const tim={isPlaying:isPlaying, setIsPlaying:setIsPlaying, label:"Session", playButton:playButton, setPlayButton:setPlayButton, timerLabel:timerLabel, setTimerLabel:setTimerLabel, play_pause:play_pause, sessionTime:sessionTime, breakTime:breakTime}

return (<>
<Buttons p={bre}/>
<Buttons p={ses}/>
<Timer   t={tim}/>






    </>)}
// <div id="timer-label">session</div>
// <div id="time-left">25:00</div>
// <button id="start_stop"> </button>
// <button id="reset">      </button>
// <audio id="beep"/>


createRoot(document.getElementById("root")).render(<App />);
