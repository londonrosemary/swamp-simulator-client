import React from 'react';
import {useNavigate} from 'react-router-dom';

import "./PetCard.styles.css"
function PetCard({pet, handleOnDelete}){
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
        navigate('/swamp')
    }

    return(
        <div>
            <img src={pet.image_url} />
            <h3>Name: {pet.name}</h3>
            <p>Overall Happiness: {pet.happiness}%</p>
            <p>Health: {pet.health}%</p>
            <p>Hunger: {pet.hunger}%</p>
            <p>Thirst: {pet.thirst}%</p>
            <p>Boredom: {pet.boredom}%</p>
            <button onClick={handleInteraction}>Interact</button>
            <button onClick={handleDelete} >Delete</button>
        </div>
    )
}

export default PetCard;