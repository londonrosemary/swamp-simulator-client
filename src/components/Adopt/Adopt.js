import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'

import AdoptForm from "../AdoptForm/AdoptForm.js"

function Adopt({setUserPets, userPets}){   
    let health = Math.floor(Math.random() * 100)
    let hunger = Math.floor(Math.random() * 100)
    let thirst = Math.floor(Math.random() * 100)
    let boredom = Math.floor(Math.random() * 100)
    let happiness = parseInt((health + hunger + thirst + boredom) / 4)

    const initialPet = {
        name: "",
        health: health,
        hunger: hunger,
        thirst: thirst,
        boredom: boredom,     
        happiness: happiness,
        image_url: "",
        user_id: localStorage.getItem("user")
    }

    const [petData, setPetData] = useState(initialPet)

    console.log(initialPet)


    let navigate = useNavigate();

    function handleGoBack(){
        navigate(-1)
    }

    return(
        <div>
            <AdoptForm initialPet={initialPet} petData={petData} setPetData={setPetData} handleGoBack={handleGoBack} setUserPets={setUserPets} userPets={userPets} />
        </div>       
    )
}

export default Adopt;
