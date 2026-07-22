import MsalContainer from "./ui-components/MsalContainer.tsx";

import './App.css'


function App() {
    return(
        <>
            <div>Stuff outside of the MsalContainer</div>
            <MsalContainer />
            <div id="text-editor" contentEditable="true"></div>
        </>
    )
}

export default App
