import React from 'react'
import { useNavigate } from 'react-router-dom';


function Logout(){
    let navigate = useNavigate();

    function handleLogout(){
        localStorage.clear("user")
        navigate("/")
        window.location.reload();
    }

    return(
        <div>
            <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Logout;