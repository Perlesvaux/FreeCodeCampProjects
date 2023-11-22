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
// let HISTORY = false
const display = useRef()

function show(event){
   let entered =  event.target.textContent

   // let old = currentValue 

    let old = currentValue
   // if (old=="" && entered == "0") return
   
    if ( history==true && ( entered == "+" || entered == "-" || entered == "/" || entered == "x" ) )  {
    // if ( HISTORY==true  )  {
    //     HISTORY = false
    //     old = currentValue
        console.log(`Keep using history! ${history}`)
        setHistory(false)
    }

    if (history==true && ( entered == "0" || entered == "1" || entered == "2" || entered == "3" || entered=="4" || entered =="5" || entered =="6" || entered=="7" || entered=="8" || entered=="9"|| entered=="." )){
        console.log(`Wipe out! ${history}`)
        old=""
        // setCurrentValue("")
        setHistory(false)

    }

    

    


 
    
   if (old=="" && entered == "0") return
   // if (old=="" && entered == "0") return

   if (old.slice(-1)=="." && entered == ".") return
   const last = old.match(/[.\d]+/g)
   if (last) 
    {
        if ( last.slice(-1)[0].includes(".") && entered == "." ) return
    }

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

   if (old.slice(-1)=="-" && entered == "x") old = old.slice(0,-1)
   if (old.slice(-1)=="-" && entered == "/") old = old.slice(0,-1)
   if (old.slice(-1)=="-" && entered == "+") old = old.slice(0,-1)

   if (old.slice(-2)=="--" && entered == "-") return 


   // if (old!="" && entered == "+" ||  old!="" && entered == "-"||   old!="" && entered == "/"||   old!="" && entered == "x") 


   console.log(old) 
   let input = old+entered; 


   setCurrentValue(input)
}


function equals(){
   const onScreenValue = currentValue.replace("x", "*").replace("--", "+")
   // setCurrentValue(eval(onScreenValue).toString())
   // console.log(eval(onScreenValue).toString())
   // HISTORY = true
   setCurrentValue(eval(onScreenValue).toString())
   setHistory(true)
}

function AC(event){
   setCurrentValue("")
   setHistory( false )
}




return (<>
<button id="equals" onClick={equals}>=</button>

<button onClick={show} id="zero"  >0</button>
<button onClick={show} id="one"   >1</button>
<button onClick={show} id="two"   >2</button>
<button onClick={show} id="three" >3</button>
<button onClick={show} id="four"  >4</button>
<button onClick={show} id="five"  >5</button>
<button onClick={show} id="six"   >6</button>
<button onClick={show} id="seven" >7</button>
<button onClick={show} id="eight" >8</button>
<button onClick={show} id="nine"  >9</button>

<button onClick={show} id="add"       >+</button>
<button onClick={show} id="subtract"  >-</button>
<button onClick={show} id="multiply"  >x</button>
<button onClick={show} id="divide"    >/</button>

<button onClick={show} id="decimal"    >.</button>
<button onClick={AC} id="clear"    >AC </button>

<div ref={display} id="display" className="well">{currentValue? currentValue: "0"} </div>
    </>)}

// <div ref={display} id="display" className="well">{currentValue? currentValue: "0"}</div>
// <div className="well">{histVal? histVal: ""}</div>

createRoot(document.getElementById("root")).render(<App />);
