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

function Buttons({ props }) {
   const { state, setState, minIs60Ref, segment } = props

   // Get the minutes corresponding to this component:
   let mins = segment === 'break'
      ? state.breakTime.getMinutes()
      : state.sessionTime.getMinutes()

   // If the minutes of this component reach 0, that should be displayed as 60:
   if (mins === 0)
   {
      mins = 60
   }

   const upwards = () => {
      // If the timer is running or the minutes of this component is 60, do nothing:
      if (state.timerIsRunning || mins === 60) return

      // Create a shallow copy of state called newState. It will be the same as state except for the Date I will increment (I will increment either breakTime or sessionTime).

      // When incrementing breakTime, I assign to it a new Date that is a copy of the previous breakTime, and then mutate the new breakTime before doing setState(newState).

      // If I didn't assign a new Date to breakTime, the previous breakTime would be passed by reference, and then it would be mutated when I increment it later. However, React needs you to treat state as immutable. Once anything is part of state, it should not be manually mutated. The same caution applies when incrementing sessionTime.

      const newState = {
         ...state,
         [`${segment}Time`]: new Date(state[`${segment}Time`])
      }

      newState[`${segment}Time`].setMinutes(newState[`${segment}Time`].getMinutes() + 1)

      // If this component's segment is the current segment, increase the minutes in the timer too:
      if (state.currentSegment === segment)
      {
         newState.timer = new Date(newState[`${segment}Time`])

         // If the timer has been incremented to 0, the Timer component should display 60:
         if (newState.timer.getMinutes() === 0)
         {
            minIs60Ref.current = true
         }
      }

      setState(newState)
   }

   const downwards = () => {
      if (state.timerIsRunning || mins === 1) return

      minIs60Ref.current = false

      // COMPLETE THIS FUNCTION FOLLOWING THE EXAMPLE OF upwards:
      
      const newState = {
         ...state,
         [`${segment}Time`]: new Date(state[`${segment}Time`])
      }

      newState[`${segment}Time`].setMinutes(newState[`${segment}Time`].getMinutes() - 1)

      // If this component's segment is the current segment, increase the minutes in the timer too:
      if (state.currentSegment === segment)
      {
         newState.timer = new Date(newState[`${segment}Time`])

         // If the timer has been incremented to 0, the Timer component should display 60:
         if (newState.timer.getMinutes() === 0)
         {
            minIs60Ref.current = true
         }
      }

      setState(newState)


   }

   return (
      <>
         <div id={`${segment}-label`}>{segment} Length</div>
         <button type='button' id={`${segment}-increment`} onClick={upwards}>
            <i className="bi bi-caret-up"></i>
         </button>
         <button type='button' id={`${segment}-decrement`} onClick={downwards}>
            <i className="bi bi-caret-down-fill"></i>
         </button>
         <div id={`${segment}-length`}>{mins}</div>
      </>
   )
}


function Timer({ props }) {
   const { state, setState, minIs60Ref } = props

   const alarmRef = useRef(null)

   const time = minIs60Ref.current
      ? '60:00'
      : state.timer.toTimeString().slice(3, 8)

   const [playButton, setPlayButton] = useState("bi bi-play-fill")

   const play_pause = () => {
      minIs60Ref.current = false

      const prevState = {...state, timerIsRunning:!state.timerIsRunning}
      // COPY THE PREVIOUS STATE, BUT FLIP timerIsRunning TO THE OPPOSITE OF ITS CURRENT VALUE:

      // CHANGE THE STATE OF THE playButton DEPENDING ON THE COPY'S timerIsRunning:

      // SET THE MUTATED COPY AS THE NEW STATE:
      setState(prevState)  
   }

   const reset = () => {
      // PAUSE THE ALARM AND PUT IT BACK TO 0:
       alarmRef.current.currentTime=0
       alarmRef.current.pause()
      
        const currentState = {
          breakTime: new Date('2023-11-26T00:05:00'),
          sessionTime: new Date('2023-11-26T00:25:00'),
          currentSegment: 'session',
          timer: new Date('2023-11-26T00:25:00'),
          timerIsRunning: false
        }

      // SET A NEW STATE WITH EVERYTHING RESET:
      setState(currentState)  
   }

   useEffect(() => {
      let timeout=null;
      if (state.timerIsRunning) 


       {
           timeout = setInterval(() => {
               // IF THE TIMER IS '00:00' FROM THE PREVIOUS RENDER, COPY THE PREVIOUS STATE BUT 
               // CHANGE THE CURRENT SEGMENT AND THE TIMER TO REFLECT THE NEW RUNNING SEGMENT, AND AFTER THAT, SET THE COPY AS THE NEW STATE, AND RETURN:
               let currentTimer = `${state.timer.getMinutes().toString().padStart(2,'0')}:${state.timer.getSeconds().toString().padStart(2,'0')}`

               if (currentTimer === "00:00") {

                   let tempState = {
                       ...state, 
                       currentSegment: (state.currentSegment==="session")? "break":"session",
                       timer: (state.currentSegment==="session")? new Date(state.breakTime) : new Date( state.sessionTime ),
                   }
                   // tempState.currentSegment= 'break'
                   setState(tempState)
                   return
               }

               // (THIS IS OUTSIDE OF THE ABOVE IF-BLOCK) COPY STATE BUT GIVE THE timer A NEW DATE OBJECT BASED ON THE PREVIOUS timer, AND THEN SET THE TIMER TO 1 SECOND LESS:
               const tempState = {...state}
               const nextDate = new Date(tempState.timer)
               nextDate.setSeconds(nextDate.getSeconds() - 1);
               tempState.timer = nextDate
               currentTimer = `${tempState.timer.getMinutes().toString().padStart(2,'0')}:${tempState.timer.getSeconds().toString().padStart(2,'0')}`

               // AFTER SUBTRACTING THAT 1 SECOND, IF THE NEW timer HAS REACHED '00:00' TRIGGER THE ALARM:
               if (currentTimer == '00:00') alarmRef.current.play()  

               // SET THE COPY AS THE NEW STATE:
               setState(tempState)

           }, 1000)
           // RETURN A FUNCTION TO CLEAR THE TIMER:
       }

       return ()=>{
           clearInterval(timeout)
       }

   })

   return (
      <>
         <div id="timer-label">{state.currentSegment}</div>
         <div id="time-left">{time}</div>
         <button id="start_stop" onClick={play_pause}>
            <i className={playButton}></i>
         </button>
         <button id="reset" onClick={reset}>
            <i className="bi bi-arrow-clockwise"></i>
         </button>
         <audio
            ref={alarmRef}
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/Beep_alarm_clock.ogg" id="beep"
         >
         </audio>
      </>
   )
}

function App() {
   const [state, setState] = useState({
      breakTime: new Date('2023-11-26T00:05:00'),
      sessionTime: new Date('2023-11-26T00:25:00'),
      currentSegment: 'session',
      timer: new Date('2023-11-26T00:25:00'),
      timerIsRunning: false
   })

   const minIs60Ref = useRef(false)

   return (
      <>
         <Buttons props={{ state, setState, minIs60Ref, segment: 'break' }} />
         <Buttons props={{ state, setState, minIs60Ref, segment: 'session' }} />
         <Timer props={{ state, setState, minIs60Ref }} />
      </>
   )
}


createRoot(document.getElementById("root")).render(<App />);
