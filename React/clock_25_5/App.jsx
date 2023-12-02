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
    })

    let sessionInt = null

    const  alarm = useRef()


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


     function play_pause(){

         if (!sessionInt)
         {
             sessionInt=setInterval(session_countdown, 1000)
         } else {
             pause()
         }
     }
    
    const f = useRef({
        p:play_pause

    })




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
    <button id="start_stop"  onClick={f.current.p}><i className="bi bi-play-fill"></i></button>
    <button id="reset" onClick={reset_button} ><i className="bi bi-arrow-clockwise"></i></button>
    <audio ref={alarm} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg" id="beep"></audio>
        </>)
}


// function App(){
//     const break_duration=useRef()
//     const session_duration=useRef()
//     let   today = new Date()
//     let   output;
//     let   isPlaying = false;
//     let   interval;

//     function testing(){
//         isPlaying = true

        
//         // console.log(break_duration.current.textContent)
//         // console.log(session_duration.current.textContent)
//            today.setHours(0,break_duration.current.textContent,0,0) 
//            output = `${today.getMinutes().toString().padStart(2,'0')}:${today.getSeconds().toString().padStart(2,'0')}`
//            console.log(output)
//            console.log(isPlaying)
//     }


//     useEffect(()=>{
//         testing() 


//     }, [])

//     return(<>
//             <Buttons break_duration={break_duration} session_duration={session_duration}/>
//         <div>  </div>
//         <button onClick={ testing }> testing </button>
//         </>)
// }


//function Timer({t}){
//    //TODO: May need to add some logic here. Some date object, setTimeout n' sheit

//    return (<>
//        <div id="timer-label">{t.timerLabel}</div>
//        <div id="time-left">{t.displayTime}</div>
//        <button ref={t.timeleft} id="start_stop"  ><i className={ t.playButton }></i></button>
//        <button id="reset" ><i className="bi bi-arrow-clockwise"></i></button>
//        <audio ref={t.alarm} src="https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg" id="beep"></audio>
//        </>)
//}




//function App() {

//    let referencetest= useRef({
//        session_countdown:null,
//        break_countdown:null,
//        session_delay:null, 
//        break_delay:null 
//    })

//// +1 to counter
//function upwards(p){
//    // if ( isPlaying ) return
//    if (p.count == 60) return
//    p.setter(p.count + 1)
//    if (p.label=="session-label") 
//    {
//        p.setDisplay(`${ p.count +1 }:00`)
//        startDate.setHours(0,p.count+1, 0,0)
//    }

//}

//// -1 to counter 
//function downwards(p){
//    // if ( isPlaying ) return
//    if (p.count ==1) return
//    p.setter(p.count - 1)
//    if (p.label=="session-label") 
//    {
//        p.setDisplay(`${ p.count -1 }:00`)
//        startDate.setHours(0,p.count-1, 0,0)
//    }
//}

//function play_pause(){
//    console.log(isPlaying)

//    if ( !isPlaying ) {
//        setPlayButton("bi bi-stop-circle") 
//        setIsPlaying(true)
//    }

//    if ( isPlaying ) {
//        setPlayButton("bi bi-play-fill") 
//        setIsPlaying(false)

//    }
//}

//const bean1 = useRef()
//const bean2 = useRef()
//// const [breakTime, setBreak] = useState(5)
//const [breakTime, setBreak] = useState(1) //for testing
//// const [sessionTime, setSession] = useState(25)
//const [sessionTime, setSession] = useState(1) //for testing
////
//const [displayTime, setDisplay] = useState("25:00") //for testing
////
//const alarm = useRef()
//const timeleft = useRef()
//const bre={title:"Break Length", label:"break-label", up:"break-increment", down:"break-decrement", len:"break-length",           count:breakTime, upwards:upwards, downwards:downwards, setter:setBreak, setDisplay:setDisplay, displayTime:displayTime, bean:bean1}
//const ses={title:"Session Length", label:"session-label", up:"session-increment", down:"session-decrement", len:"session-length", count:sessionTime, upwards:upwards, downwards:downwards, setter:setSession, setDisplay:setDisplay, displayTime:displayTime, bean:bean2}

//const [playButton, setPlayButton] = useState("bi bi-play-fill")
//const [timerLabel, setTimerLabel] = useState("Session")
//const [isPlaying, setIsPlaying]   = useState(false)

//let session_countdown;
//let break_countdown;
//const tim={isPlaying:isPlaying, setIsPlaying:setIsPlaying, label:"Session", playButton:playButton, setPlayButton:setPlayButton, timerLabel:timerLabel, setTimerLabel:setTimerLabel, play_pause:play_pause, sessionTime:sessionTime, breakTime:breakTime, setDisplay:setDisplay, displayTime:displayTime, alarm:alarm, break_countdown:break_countdown, session_countdown:session_countdown, timeleft:timeleft}

//// let onoff = false;
//let output;
//function today(){
//    const today = new Date();
//    today.setHours(0, sessionTime, 0, 0);
//    return today
//}
//const [startDate, setStartDate]= useState( today() );
//// const [stored, setStored]= useState( new Date() );
//useEffect(()=>{

//    // let session_countdown;
//    // let break_countdown;
//    let { session_countdown, break_countdown, session_delay, break_delay } = referencetest.current
    
//    function delayClick(){
//        timeleft.current.click()
//        clearTimeout(session_delay)
//        session_delay=null
//        clearTimeout(break_delay)
//        break_delay=null
//    }


//    function playpause(){
//        console.log(bean1.current)
//            play_pause()
//    // onoff=!onoff;
//    // console.log(onoff)

//    function timer_session(){
//        setTimerLabel("Session")

//        function countDownSession() {
//            // if (!onoff) { console.log("Session Stopped!!"); clearing(); }

//            startDate.setSeconds(startDate.getSeconds() - 1);
//            output = `${startDate.getMinutes().toString().padStart(2,'0')}:${startDate.getSeconds().toString().padStart(2,'0')}`
//            setDisplay(output)
//            console.log(output + "ongoing session") 

            
//            if (output == "00:00"){ console.log("yeahh!!!"); clearInterval(session_countdown); session_countdown=null; alarm.current.play()
//               if (!break_countdown) {
//                   startDate.setHours(0,breakTime,0,0)
//                   timer_break();
//                   session_delay = setTimeout(delayClick, 1000)
//               };
//            }; 
//        };

//        // Use setInterval to call the countdown function every 1000 milliseconds (1 second)
//        if (!session_countdown) session_countdown = setInterval(countDownSession, 1000);

//    }



//    function timer_break(){
//        setTimerLabel("Break")

//        function countDownBreak() {
//            // if (!onoff) { console.log("Break Stopped!!"); clearing(); }

//            startDate.setSeconds(startDate.getSeconds() - 1);
//            output = `${startDate.getMinutes().toString().padStart(2,'0')}:${startDate.getSeconds().toString().padStart(2,'0')}`
//            setDisplay(output)
//            console.log(output + "inbreak") 
            
//            if (output == "00:00"){ console.log("yeahh!!!"); clearInterval(break_countdown); break_countdown=null; alarm.current.play()
//                if (!session_countdown) { 
//                    startDate.setHours(0,sessionTime,0,0)
//                    timer_session();
//                   break_delay = setTimeout(delayClick, 1000)
//                }                
//            }; 
//        };

//        // Use setInterval to call the countdown function every 1000 milliseconds (1 second)
//        if (!break_countdown) break_countdown = setInterval(countDownBreak, 1000);

//    }





//    if (timerLabel == "Session"){
//        console.log("is now on session")
//        if(!session_countdown) {timer_session()} 
//        // if(!onoff) {clearing()}
//        else {clearing()}
//    }


//    if (timerLabel == "Break"){
//        console.log("is now on break")
//        if(!break_countdown) {timer_break()} 
//        // if(!onoff) {clearing()}
//        else {clearing()}
//    }



//    } 



//    function clearing (){
//        clearInterval(session_countdown)
//        session_countdown=null
//        clearInterval(break_countdown)
//        break_countdown=null
//        console.log("Stop!")

//        // timeleft.current.removeEventListener("click", playpause)
//    }




//    timeleft.current.addEventListener("click", playpause)
//    // if (output=="00:00") 

//    return ()=>{

//        // if(timerLabel=="Session"){
//        //     clearInterval(session_countdown)
//        //     session_countdown=null
//        //     console.log('works!')
//        // }
//        clearing()
//        // timeleft.current.click()
//        timeleft.current.removeEventListener("click", playpause)
//            // console.log(session_countdown)
//        // if(timerLabel=="Session"){
//            // clearInterval(session_countdown)
//            // session_countdown=null
//        // }
//        // if(timerLabel=="Break"){
//            // clearInterval(break_countdown)
//            // break_countdown=null
//        // }
//    }



//}, [startDate, timerLabel])


//return (<>
//<Buttons p={bre}/>
//<Buttons p={ses}/>
//<Timer   t={tim}/>

//    </>)}
createRoot(document.getElementById("root")).render(<App />);
