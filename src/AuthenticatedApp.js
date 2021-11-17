import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom"

import PetsPage from "./components/PetsPage/PetsPage.js";
import Adopt from "./components/Adopt/Adopt.js";
import Swamp from "./components/Swamp/Swamp.js";

function AuthenticatedApp() {
    const [userPets, setUserPets] = useState([])
    const [currentPet, setCurrentPet] = useState({})
    const [fetchSwitch, setFetchSwitch] = useState(false)
    const [intervalId, setIntervalId] = useState(0)

    const id = localStorage.getItem('user')

    //UseEffect fetches current logged in user and sets their pets to the userPets state. fetchSwitch dependancy is changed via any patch request.
    useEffect(() =>{
        fetch(`https://swamp-simulator.herokuapp.com/users/${id}`)
            .then(res => res.json())
            .then(user => {
                stop()
                setUserPets(user.pets)
            })
    }, [fetchSwitch])
    
    //This starts decreaseStats countdown on initial page load.
    useEffect(() => {
        stop()
        start()
        console.log("test")
    }, [userPets])

    //When the user deletes a pet, the state updates to reflect that change
    function handleOnDelete(id){
        const updatedPetsArr = userPets.filter(pet => pet.id !== id);
        setUserPets(updatedPetsArr)
    } 

    //Used to decrease the pet Stats over time
    function decreaseStats(){
        if(userPets.length > 0){
            console.log("decreasing", userPets)
            // const decreasedArr = userPets.map((pet) => {
            //     return( parseInt(
            //         pet.health = pet.health - 1,
            //         pet.hunger = pet.hunger - 1,
            //         pet.thirst = pet.thirst - 1,
            //         pet.boredom = pet.boredom - 1,
            //         pet.happiness = (pet.health + pet.hunger + pet.thirst + pet.boredom) /4
            //     ))
            // })
            // setUserPets(parseInt(decreasedArr))
            // console.log("decreased?", userPets)
        }
    }

    //Function that starts count down for decreasing stats
    function start(){
        console.log("start", userPets)
        const nIntervalId = setInterval(decreaseStats, 15000);
        setIntervalId(nIntervalId)
    }

    //Function that stops count down for decreasing stats
    function stop(){
        if(intervalId){
            clearInterval(intervalId)
            setIntervalId(0)
            return
        }        
    }

    // console.log("user Pets:", userPets)
    return(
        <div>
            <Routes>
                <Route path= "/home" element={<PetsPage userPets={userPets} setUserPets={setUserPets} handleOnDelete={handleOnDelete} currentPet={currentPet} setCurrentPet={setCurrentPet} start={start} />}></Route>
                <Route exact path= "/home/adopt" element={<Adopt setUserPets={setUserPets} userPets={userPets} />}></Route>
                <Route path= "/swamp" element={<Swamp currentPet={currentPet} fetchSwitch={fetchSwitch} setFetchSwitch={setFetchSwitch} stop={stop} start={start} />}></Route>
            </Routes>
        </div>
    )
}

export default AuthenticatedApp;