"use strict";

import React, {
  StrictMode,
  useState,
  createContext,
  useContext,
  useEffect
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";


function App() {
    const [text, setText] = useState({
        quote:"And there is Don Quixote, who long ago paid the penalty for wrongly imagining that knight errantry was compatible with all economic forms of society.",
        author:"Karl Marx",
        color: ""
    })

    function pickRandomColor(){
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
        let hexColor = '#';
        for (let i = 0; i < 6; i++){
            hexColor += hex[Math.floor(Math.random()*hex.length)]
        };
        return hexColor;
    }

    async function fetchQuote(){
        try {
            //fetching resource!
            const res = await fetch("https://api.quotable.io/random")
            const data = await res.json()

            //Assigning them to state!
            setText({
                quote:data.content,
                author:data.author,
                color:pickRandomColor()
            });

        } catch (error){console.error("Error:", error)}
    }

    useEffect(()=>{
        fetchQuote()
    },[])

    const urlParameters = encodeURIComponent(`"${text.quote}" - ${text.author}`)
    const twitt = `https://twitter.com/intent/tweet?text=${urlParameters}`
     
return (
<div id="quote-box" className="container card" style={{backgroundColor:text.color, transition:"5s", borderColor:text.color, borderRadius:"20px", maxWidth:"360px", minWidth:"300", maxHeight:"500px", minHeight:"450px" }}>
<br/>
    <div className="card" style={{borderRadius:"20px 20px 15px 15px",maxHeight:"300px", minHeight:"250px"}}> 
    <div id="text"  className="card-body" style={{backgroundColor:"antiqueWhite", borderRadius:"20px 20px 0px 0px" }}>  <i className="bi bi-quote"></i>{text.quote}</div>
    <div id="author" className="text-right text-primary"> — {text.author} <i className="bi bi-pen-fill"></i> </div>
    </div>

    <div style={{maxHeight:"100px", minHeight:"100px"}}>
<br/>
<br/>
    <div class="d-grid gap-2"> 
        <button id="new-quote" className="btn btn-primary" onClick={fetchQuote}><i className="bi bi-shuffle"></i>   </button>
        <a href={twitt} id="tweet-quote" className="btn btn-info"  target="_top"><i className="bi bi-twitter"></i></a>
    </div>
    </div>
</div>
)}

createRoot(document.getElementById("root")).render(<App />);
