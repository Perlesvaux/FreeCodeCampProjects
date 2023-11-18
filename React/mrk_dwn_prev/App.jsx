"use strict";

import React, {
  StrictMode,
  useState,
} from "https://esm.sh/react?dev";
import { createRoot } from "https://esm.sh/react-dom/client?dev";

function App() {

//As seen in Marked's documentation. Replaces \n with <br>
marked.use({
    breaks:true
});

//initial text. Tildes have been escaped.
const welcome = `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
Heres some code, \`<div></div>\`, between 2 backticks.
\`\`\`
// this is multi-line code:
function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`
const [text, setText] = useState(welcome)

function translate(event){
    setText(event.target.value)
}

return (<>
<div className="container well well-lg">
    <div id="margins" className="row justify-content-xs-center">
        <div className="well well-xs col-xs-6">
            <div  className="text-center" id="he-editor"> Editor </div>
            <textarea id="editor" className="center-block form-control" onChange={translate} defaultValue={text}></textarea>
        </div>
        <div className="well well-xs col-xs-6"> 
            <div  className="text-center" id="he-preview"> Preview </div>
            <div id="preview" className="center-block form-control" dangerouslySetInnerHTML={{ __html:  DOMPurify.sanitize(marked.parse(text))}}></div>
        </div>
    </div>
</div>
    </>)}


createRoot(document.getElementById("root")).render(<App />);
