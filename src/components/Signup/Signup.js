import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

function Signup({isSignedUp, switchMode}){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_Confirmation] = useState("")
    const [passwordShown, setPasswordShown] = useState(false)
    const [confPasswordShown, setConfPasswordShown] = useState(false)

    let navigate = useNavigate();

    function togglePasswordVisiblity(){
        setPasswordShown(passwordShown ? false : true);
    };
    
    function toggleConfPasswordVisiblity(){
        setConfPasswordShown(confPasswordShown ? false : true);
    };

    function handleSignupSubmit(e){
        e.preventDefault()
        // console.log("Creating account...")
        if (password === password_confirmation){
            fetch("https://swamp-simulator.herokuapp.com/users", {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({username, email, password, password_confirmation})
            })
                .then(resp => resp.json())
                .then(user => {
                // console.log('Success:', user)
                localStorage.setItem("user", user.id);
                navigate("home")
                window.location.reload();
                })
                .catch(error => console.log('Error:', error))
        }
        else {
            alert('passwords must match')
        }
        
    }

    return(
        <div className='formContainer'>
            <form className='LogoutForm' onSubmit={e => handleSignupSubmit(e)}>
                <div className='nonPwInput'>
                    <input 
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <input
                    placeholder="Password"
                    name="password"
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <i onClick={togglePasswordVisiblity}>view</i>
                <input
                    placeholder="Password Confirmation"
                    name="password_confirmation"
                    type={confPasswordShown ? "text" : "password"}
                    value={password_confirmation}
                    onChange={e => setPassword_Confirmation(e.target.value)}
                    required
                />
                <i onClick={toggleConfPasswordVisiblity}>view</i>
                <div className="auth__form-container_fields-content_button">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <p>
                {isSignedUp
                    ? "have an account? "
                    : "need an account? "}
                <em onClick={switchMode}>{isSignedUp ? "sign in" : "sign up"}</em>
            </p>
        </div>
    )
}

export default Signup;