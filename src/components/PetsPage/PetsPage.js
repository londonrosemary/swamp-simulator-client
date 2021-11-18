import React from 'react';
import {useNavigate} from 'react-router-dom'

import Logout from "../Logout/Logout.js"
import PetsList from '../PetsList/PetsList.js';

function PetsPage({userPets, handleOnDelete, currentPet, setCurrentPet}){
    let navigate = useNavigate();

    function linkToAdopt(){
        navigate('adopt')
    }

    return(
        <div>
            <PetsList userPets={userPets} handleOnDelete={handleOnDelete} currentPet={currentPet} setCurrentPet={setCurrentPet} />
            <button onClick={linkToAdopt}>adopt a gator</button>
            <Logout />
        </div>
    )
}

export default PetsPage;