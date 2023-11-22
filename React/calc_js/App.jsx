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
const display = useRef()

function show(event){
   let entered =  event.target.textContent
   let old = currentValue 
    
   if (old=="" && entered == "0") return

   // console.log(old.slice(-2)) 
   // console.log(old.length) 
   if (old.slice(-1)=="." && entered == ".") return
   const last = old.match(/[.\d]+/g)
   // if (last) if (last.slice(-1).includes(".")) return 
   if (last) 
    {
        // console.log(last.slice(-1)[0]) 
        // console.log(last.slice(-1)[0].includes("."))
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

   let input = old+entered; 
   // input = input.replace("--", "+") 
   // console.log(input.slice(-1)) 
   // const minus = input.match(/--\d+/g)
   // if (minus)
   // { for (let i of minus) input = input.replace(i, `(${i})`)  }
   // { for (let i of minus) console.log( input.replace(i, `(${i})`) )  }




   setCurrentValue(input)
    // console.log(display.current)
}

function equals(){
    // console.log(eval(display.current.textContent))
   // input = input.replace("--", "+") 
   const onScreenValue = currentValue.replace("x", "*").replace("--", "+")
   setCurrentValue(eval(onScreenValue).toString())
    console.log(eval(onScreenValue).toString())
    
}

function AC(event){
   setCurrentValue("")
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

<div ref={display} id="display" className="well">{currentValue? currentValue: "0"}</div>
    </>)}


createRoot(document.getElementById("root")).render(<App />);
