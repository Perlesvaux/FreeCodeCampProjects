"use strict";

import React, {
  StrictMode,
  useState,
  createContext,
  useContext,
  useEffect
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

function DrumKey({elements}){

    function playTrack(HTMLelement){
       HTMLelement.target.children[0].play(); 
       document.getElementById("display").innerText=HTMLelement.target.id  //can be made even more modular: element.display
    }


    return(<>
<div  onClick={playTrack} id={elements.name} className="drum-pad col-xs-4">{elements.letter}<audio className="clip" id={elements.letter} src={elements.src}  /></div>
        </>)
}

function DrumKeyBoard({children}){

document.addEventListener("keydown", (e)=>{
    if (event.key.length === 1) {
      // console.log(`Pressed key: ${event.key}`);
        const t = document.getElementById("keys") //may make it more modular later on
        // const k = t.filter(( letter ) => 'Q')
        for (let x of t.children) {
            // console.log(x.children[0])
            if (event.key.toUpperCase() == x.children[0].id){
                x.children[0].play()
            }
        }        
    }
});
    
    return(<div>
<div id="keys"> {children} </div>
        
        </div>)
}


function App() {

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


// document.addEventListener("keydown", (e)=>{
//     if (event.key.length === 1) {
//       // console.log(`Pressed key: ${event.key}`);
//         const t = document.getElementById("keys") //may make it more modular later on
//         // const k = t.filter(( letter ) => 'Q')
//         for (let x of t.children) {
//             // console.log(x.children[0])
//             if (event.key.toUpperCase() == x.children[0].id){
//                 x.children[0].play()
//             }
//         }        
//     }
// });

return (<>
<div id="drum-machine" className="container ">
    <DrumKeyBoard>
    {
        elements.map(( x )=> <DrumKey key={x.letter} elements={x}/>)
    }
    </DrumKeyBoard>

    <div id="display" className="col-xs-2"></div>
</div>
    </>)    
}


createRoot(document.getElementById("root")).render(<App />);
