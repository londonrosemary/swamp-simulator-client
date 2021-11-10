import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom"

import PetsPage from "./components/PetsPage/PetsPage.js";
import Adopt from "./components/Adopt/Adopt.js";
import Swamp from "./components/Swamp/Swamp.js";

function AuthenticatedApp() {
    const [userPets, setUserPets] = useState([])
    const [currentPet, setCurrentPet] = useState({})
    const id = localStorage.getItem('user')

    useEffect(() =>{
        fetch(`https://swamp-simulator.herokuapp.com/users/${id}`)
            .then(res => res.json())
            .then(user => {
                setUserPets(user.pets)
            })
    }, [])

    function handleOnDelete(id){
        const updatedPetsArr = userPets.filter(pet => pet.id !== id);
        setUserPets(updatedPetsArr)
    } 

    return(
        <div>
            <Routes>
                <Route path= "/home" element={<PetsPage userPets={userPets} setUserPets={setUserPets} handleOnDelete={handleOnDelete} currentPet={currentPet} setCurrentPet={setCurrentPet} />}></Route>
                <Route exact path= "/home/adopt" element={<Adopt setUserPets={setUserPets} userPets={userPets} />}></Route>
                <Route path= "/swamp" element={<Swamp currentPet={currentPet} setCurrentPet={setCurrentPet} />}></Route>
            </Routes>
        </div>
    )
}

export default AuthenticatedApp;