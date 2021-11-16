import React from 'react';
import {useNavigate} from 'react-router-dom';

import "./PetCard.styles.css"
function PetCard({pet, handleOnDelete, currentPet, setCurrentPet}){
    let navigate = useNavigate();
    
    function handleDelete(){
        console.log("deleting...")
        console.log(pet.id)
        fetch(`https://swamp-simulator.herokuapp.com/pets/${pet.id}`, {
            method: 'DELETE'
        })
        handleOnDelete(pet.id)
    }

    function handleInteraction(){
        setCurrentPet(pet)
        navigate('/swamp')
        console.log("current pet:", currentPet)
    }

    return(
        <div>
            <img classname="cardImg" src={pet.image_url} />
            <h3>Name: {pet.name}</h3>
            <p>Overall Happiness: {pet.happiness}%</p>
            <button onClick={handleInteraction}>Interact</button>
            <button onClick={handleDelete} >Delete</button>
        </div>
    )
}

export default PetCard;