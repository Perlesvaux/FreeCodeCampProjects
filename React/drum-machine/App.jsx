"use strict";

import React, {
  useState,  
  StrictMode,
  useEffect,
  useRef
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

function DrumKey({elements, playTrack}){

    return(<button  onClick={playTrack} id={elements.name} className="drum-pad col-xs-4 btn btn-primary ">{elements.letter}<audio className="clip" id={elements.letter} src={elements.src}/></button>)
}

function App(){
    const [display, setDisplay] = useState("")
    const keyref = useRef()

    const elements =     [
        {name:"key1", letter:"Q", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"    },
        {name:"key2", letter:"W", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"    }, 
        {name:"key3", letter:"E", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"    },
        {name:"key4", letter:"A", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"  },
        {name:"key5", letter:"S", src:"https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"    },
        {name:"key6", letter:"D", src:"https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"      },
        {name:"key7", letter:"Z", src:"https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"  },
        {name:"key8", letter:"X", src:"https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"  },
        {name:"key9", letter:"C", src:"https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"      },
    ]

    function playTrack(HTMLelement){
       HTMLelement.target.children[0].currentTime = 0
       HTMLelement.target.children[0].play(); 
       setDisplay( HTMLelement.target.id); 
       // HTMLelement.target.classList.toggle("press"); 
       setTimeout(
       ()=>{HTMLelement.target.classList.toggle("press")} 
            , 1000) 
    HTMLelement.target.classList.toggle("press")

    }

    useEffect(()=>{
     document.addEventListener("keydown", (event)=>{
        if (event.key.length === 1) {
        const pressed = Array.from(keyref.current.children).find(
          (x) => x.children[0].id === event.key.toUpperCase()
        );
        console.log(keyref.current)
        if (pressed) pressed.click();
      }
    });
    },[])
    
    return(
    <div id="drum-machine" className="container well well-lg">  
    <div id="keys" ref={keyref}>
    {
        elements.map(( x )=> <DrumKey key={x.letter} elements={x} playTrack={ playTrack }/>)
    }
    </div> 
    <div id="display" className="block-center well">{display}</div>
    </div>)
}

createRoot(document.getElementById("root")).render(<App />);
