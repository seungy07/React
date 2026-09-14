import { useState } from "react";
import FrontComp from "./FrontComp";
import BackComp from "./BackComp";

function Component3(){
    const [mode, setMode] = useState('both');
    const handleSetMode = (mode) => {
        setMode(mode);
    };

    let contents = '';
    if( mode == 'front'){
        contents = <>
            <FrontComp onSetMode = { (mode)=>{ setMode(mode); }} />
        </>
    }else if (mode == 'back'){
        contents = <>
            <BackComp setMode={setMode}/>
        </>
    }else{
        contents = <>
            <FrontComp onSetMode={ (mode) => {handleSetMode(mode);} }/>
            <BackComp setMode={handleSetMode} />
        </>
    }
    return (<>
        <h2><a href="/" onClick={(event)=>{
            event.preventDefault();
            setMode('both');
        }}>React-State</a></h2>
        <ol>
            {contents}
        </ol>
    </>)
}
export default Component3