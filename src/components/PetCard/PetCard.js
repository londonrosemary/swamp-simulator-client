import React from 'react';
import {useNavigate} from 'react-router-dom';

import "./PetCard.styles.css"
function PetCard({pet, handleOnDelete, currentPet, setCurrentPet}){
    let navigate = useNavigate();
    
    function handleDelete(){
        // console.log("deleting...")
        // console.log(pet.id)
        fetch(`https://swamp-simulator.herokuapp.com/pets/${pet.id}`, {
            method: 'DELETE'
        })
        handleOnDelete(pet.id)
    }

    function handleInteraction(){
        setCurrentPet(pet)
        navigate('/swamp')
        // console.log("current pet:", currentPet)
    }

    return(
        <div  className='petCard' >
            <div className="cardImg">
                <img  src={pet.image_url} />
            </div>
            <h3>name: {pet.name}</h3>
            <p>happiness: {pet.happiness}%</p>
            <button onClick={handleInteraction} >interact</button>
            <button onClick={handleDelete} >delete</button>
        </div>
    )
}

export default PetCard;