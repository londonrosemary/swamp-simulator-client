import React from 'react';

import PetCard from "../PetCard/PetCard.js";

function PetsList({userPets, handleOnDelete, currentPet, setCurrentPet}){
    
    // console.log("pets:", userPets)
    const petArr = userPets.map((pet) => {
        return(<PetCard key={pet.id} pet={pet} handleOnDelete={handleOnDelete} currentPet={currentPet} setCurrentPet={setCurrentPet} /> )
    })

    return(
        <ul>
            {petArr}
        </ul>
    )
}

export default PetsList;