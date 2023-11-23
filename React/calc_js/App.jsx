"use strict";

import React, {
  StrictMode,
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,  
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";


function App() {
const [currentValue, setCurrentValue]= useState("")
const [history, setHistory]= useState(false)
// const b1 = useRef()
// const b2 = useRef()
// const b3 = useRef()
// const b4 = useRef()
// const b5 = useRef()
// const b6 = useRef()
// const b7 = useRef()
// const b8 = useRef()
// const b9 = useRef()
// const b0 = useRef()

// const bs = useRef()
// const bm = useRef()
// const bd = useRef()
// const br = useRef()
// const bp = useRef()

// const bc = useRef()
// const be = useRef()

const reference =  [
useRef(),useRef(),useRef(),useRef(),useRef(),
useRef(),useRef(),useRef(),useRef(),useRef(),
useRef(),useRef(),useRef(),useRef(),useRef(),
useRef(),useRef()
]

useEffect(()=>{

    document.addEventListener("keydown",(e)=>{
        let pressed = e.key
        if (e.key == "Backspace" || e.key == "Delete") pressed = "AC"
        if (e.key == "*") pressed = "x"
        if (e.key == "Enter") pressed = "="

        for (let x of reference){
            if (pressed == x.current.textContent) x.current.click()
        }
    });




}, [])


function show(event){
    let entered =  event.target.textContent
    let old = currentValue

    //Was there a previous operation? Follow-up with a sign to keep doing math
    if ( history==true && ( entered == "+" || entered == "-" || entered == "/" || entered == "x" ) )  {
        console.log(`Keep using history! ${history}`)
        setHistory(false)
    }

    //Was there a previous operation? Follow-up with a number to start all over again
    if (history==true && ( entered == "1" || entered == "2" || entered == "3" || entered=="4" || entered =="5" || entered =="6" || entered=="7" || entered=="8" || entered=="9"|| entered=="." )){
        console.log(`Wipe out! ${history}`)
        old=""
        setHistory(false)
    }

    //Was there a previous operation? Follow-up with 0 to clear the screen.
    if (history == true && entered=="0"){
        setCurrentValue("")
        setHistory(false)
        return
    }


    //No zeroes allowed as first input!
    if (old=="" && entered == "0") return

    //Numbers only have a single decimal point!
    if (old.slice(-1)=="." && entered == ".") return
    const last = old.match(/[.\d]+/g)
    if (last) 
    {
        if ( last.slice(-1)[0].includes(".") && entered == "." ) return
    }


    //Perform an action depending on the last character on-screen & user-input.
    //if same sign is entered twice in a row, second iteration is ignored
    //if "." is entered, input defaults to "0."
    //if two different signs are entered in a row, latest replaces oldest
    //if last two characters are a sign and a "-", those are replaced by user-input

    if (old.slice(-1)=="/" && entered == "/") return
    if (old.slice(-1)=="/" && entered == ".") entered = "0."
    if (old.slice(-1)=="/" && entered == "+") old = old.slice(0,-1)
    if (old.slice(-1)=="/" && entered == "x") old = old.slice(0,-1)

    if (old.slice(-2)=="/-" && entered == "-" ) return 
    if (old.slice(-2)=="/-" && entered == "/" ) old=old.slice(0,-2) 
    if (old.slice(-2)=="/-" && entered == "+" ) old=old.slice(0,-2); 
    if (old.slice(-2)=="/-" && entered == "x" ) old=old.slice(0,-2); 

    if (old.slice(-1)=="+" && entered == "+") return
    if (old.slice(-1)=="+" && entered == ".") entered = "0."
    if (old.slice(-1)=="+" && entered == "/") old = old.slice(0,-1)
    if (old.slice(-1)=="+" && entered == "x") old = old.slice(0,-1)

    if (old.slice(-2)=="+-" && entered == "-") return 
    if (old.slice(-2)=="+-" && entered == "/" ) old=old.slice(0,-2) 
    if (old.slice(-2)=="+-" && entered == "+" ) old=old.slice(0,-2); 
    if (old.slice(-2)=="+-" && entered == "x" ) old=old.slice(0,-2); 

    if (old.slice(-1)=="x" && entered == "x") return
    if (old.slice(-1)=="x" && entered == ".") entered = "0."
    if (old.slice(-1)=="x" && entered == "/") old = old.slice(0,-1)
    if (old.slice(-1)=="x" && entered == "+") old = old.slice(0,-1)

    if (old.slice(-2)=="x-" && entered == "-") return 
    if (old.slice(-2)=="x-" && entered == "/" ) old=old.slice(0,-2) 
    if (old.slice(-2)=="x-" && entered == "+" ) old=old.slice(0,-2); 
    if (old.slice(-2)=="x-" && entered == "x" ) old=old.slice(0,-2); 

    if (old.slice(-2)=="--" && entered == "-") return 
    if (old.slice(-1)=="-" && entered == ".") entered = "0."
    if (old.slice(-1)=="-" && entered == "x") old = old.slice(0,-1)
    if (old.slice(-1)=="-" && entered == "/") old = old.slice(0,-1)
    if (old.slice(-1)=="-" && entered == "+") old = old.slice(0,-1)

    //No zeroes allowed immediately after sign
    if (old.slice(-1)=="-" && entered == "0") return
    if (old.slice(-1)=="+" && entered == "0") return
    if (old.slice(-1)=="x" && entered == "0") return
    if (old.slice(-1)=="/" && entered == "0") return

    let input = old+entered; 
    setCurrentValue(input)
}


function equals(){
   if ( currentValue == "" ) return
   const onScreenValue = currentValue.replace("x", "*").replace("--", "+")
   setCurrentValue(eval(onScreenValue).toString())
   setHistory(true)
}

function AC(event){
   setCurrentValue("")
   setHistory( false )
}


return (<>
<div id="main" className="container-fluid">


    <div className="row"> 
    <div id="display" className="card">{currentValue? currentValue: "0"} </div>
    </div>
    <div className="row">

    <div className="col-md col-xs col-sm col-lg col-xl">

    <div className="row"> 
    <button ref={reference[0]} className="btn btn-success   col-md col-xs col-sm col-lg col-xl" id="equals" onClick={equals}>=</button>
    </div>

    <div className="row"> 
    <button ref={reference[1]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="seven" >7</button>
    <button ref={reference[2]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="eight" >8</button>
    <button ref={reference[3]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="nine"  >9</button>
    </div>

    <div className="row"> 
    <button ref={reference[4]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="four"  >4</button>
    <button ref={reference[5]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="five"  >5</button>
    <button ref={reference[6]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="six"   >6</button>
    </div>

    <div className="row"> 
    <button ref={reference[7]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="one"   >1</button>
    <button ref={reference[8]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="two"   >2</button>
    <button ref={reference[9]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="three" >3</button>
    </div>

    <div className="row"> 
    <button ref={reference[10]} className="btn btn-primary   col-md-6 col-xs-6 col-sm-6 col-lg-6 col-xl-6" onClick={show} id="zero"  >0</button>
    <button ref={reference[11]} className="btn btn-primary   col-md col-xs col-sm col-lg col-xl" onClick={show} id="decimal"    >.</button>
    </div>
    </div>

    <div className="col-md-4 col-xs-4 col-sm-4 col-lg-4 col-xl-4">

    <div className="row"> 
    <button ref={reference[12]} className="btn btn-danger    col-md col-xs col-sm col-lg col-xl" onClick={AC} id="clear"    >AC</button>
    </div>
    <div className="row"> 
    <button ref={reference[13]} className="btn btn-secondary col-md col-xs col-sm col-lg col-xl" onClick={show} id="add"       >+</button>
    </div>
    <div className="row"> 
    <button ref={reference[14]} className="btn btn-secondary col-md col-xs col-sm col-lg col-xl" onClick={show} id="divide"    >/</button>
    </div>
    <div className="row"> 
    <button ref={reference[15]} className="btn btn-secondary col-md col-xs col-sm col-lg col-xl" onClick={show} id="multiply"  >x</button>
    </div>
    <div className="row"> 
    <button ref={reference[16]} className="btn btn-secondary col-md col-xs col-sm col-lg col-xl" onClick={show} id="subtract"  >-</button>
    </div>
    </div>
</div>


    </div>
</>)}


createRoot(document.getElementById("root")).render(<App />);
