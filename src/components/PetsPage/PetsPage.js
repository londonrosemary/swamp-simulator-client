import React from 'react';
import {useNavigate} from 'react-router-dom'

import Logout from "../Logout/Logout.js"
import PetsList from '../PetsList/PetsList.js';

function PetsPage({userPets, handleOnDelete, currentPet, setCurrentPet}){
    let navigate = useNavigate();

    function linkToAdopt(){
        navigate('adopt')
    }
    if (userPets.length === 0) {
        return (
            <div>
                <h3>it looks like you have no pets :(</h3>
                <h4>adopt one now by clicking the button below</h4>
                <button onClick={linkToAdopt}>adopt a gator</button>
                <Logout />
            </div>
        )
    }
    else {

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