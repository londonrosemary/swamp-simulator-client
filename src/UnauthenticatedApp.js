import React, {useState} from "react";

import Signup from "./components/Signup/Signup.js"
import Login from "./components/Login/Login.js"

function UnauthenticatedApp(){
    const [isSignedUp, setIsSignedUp] = useState(true);

    function switchMode(){
        setIsSignedUp((prevIsSignedUp) => !prevIsSignedUp);
    };
    
    
    return(
        <div>
            <h1 className='header'>swamp simulator</h1>
            {isSignedUp ? (
                <Signup isSignedUp={isSignedUp} switchMode={switchMode} />
            ) : (
                <Login isSignedUp={isSignedUp} switchMode={switchMode} />
            )}
        </div>
    )
}

export default UnauthenticatedApp;