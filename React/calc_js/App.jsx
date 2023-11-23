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
   const onScreenValue = currentValue.replace("x", "*").replace("--", "+")
   setCurrentValue(eval(onScreenValue).toString())
   setHistory(true)
}

function AC(event){
   setCurrentValue("")
   setHistory( false )
}


return (<>


    <div className="container-fluid">

<div className="row"> 
<div id="display" className="card">{currentValue? currentValue: "0"} </div>
</div>

<div className="row"> 
<button className="btn btn-success   col-md-6 col-xs-6 col-sm-6 col-lg-6 col-xl-6" id="equals" onClick={equals}>=</button>
<button className="btn btn-danger    col-md-6 col-xs-6 col-sm-6 col-lg-6 col-xl-6" onClick={AC} id="clear"    >AC </button>
</div>

<div className="row"> 
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="seven" >7</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="eight" >8</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="nine"  >9</button>
<button className="btn btn-secondary col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="add"       >+</button>
</div>

<div className="row"> 
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="four"  >4</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="five"  >5</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="six"   >6</button>
<button className="btn btn-secondary col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="divide"    >/</button>
</div>

<div className="row"> 
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="one"   >1</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="two"   >2</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="three" >3</button>
<button className="btn btn-secondary col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="multiply"  >x</button>
</div>

<div className="row"> 
<button className="btn btn-primary   col-md-6 col-xs-6 col-sm-6 col-lg-6 col-xl-6" onClick={show} id="zero"  >0</button>
<button className="btn btn-primary   col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="decimal"    >.</button>
<button className="btn btn-secondary col-md-3 col-xs-3 col-sm-3 col-lg-3 col-xl-3" onClick={show} id="subtract"  >-</button>
</div>

    </div>
</>)}


createRoot(document.getElementById("root")).render(<App />);
