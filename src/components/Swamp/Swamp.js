// parseInt((updatedPet.health + updatedPet.hunger + updatedPet.thirst + updatedPet.boredom) /4)
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import "./Swamp.styles.css"

function Swamp({currentPet, start, stop, fetchSwitch, setFetchSwitch}){
    const [updatedPet, setUpdatedPet] = useState({
        health: currentPet.health,
        hunger: currentPet.hunger,
        thirst: currentPet.thirst,
        boredom: currentPet.boredom
    })
    const [updatedHappiness, setUpdatedHappiness] = useState(currentPet.happiness)
    
    let navigate = useNavigate();
    
    //Navigate back to home page. In order to avoid stacking /swamp/home must nav back -1 then add to "/home" since "/" holds blank page
    function handleNavHome(){
        navigate(-1)
        navigate('home')
    }

    //Function to dynamically increase pet stat via button click
    function increaseStat(stat){
        if (updatedPet[stat] >= 95) {
            setUpdatedPet({...updatedPet, [stat]: 100})
        }
        else {
            setUpdatedPet({...updatedPet, [stat]: updatedPet[stat] + 5})
        }
        setUpdatedHappiness(parseInt((updatedPet.health + updatedPet.hunger + updatedPet.thirst + updatedPet.boredom) /4))
        
    }

    //Sends patch request to update current pet stats. Only runs after average is taken and updated.
    useEffect(() => {
        fetch(`https://swamp-simulator.herokuapp.com/pets/${currentPet.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                happiness: updatedHappiness,
                health: updatedPet.health,
                hunger: updatedPet.hunger,
                thirst: updatedPet.thirst,
                boredom: updatedPet.boredom
            })
        })
            .then(resp => resp.json())
            .then(data => {
                // console.log("posted", data)
                setFetchSwitch(!fetchSwitch)
            })
    }, [updatedHappiness])
        
    return(
        <div className="swampBody">
            <button className='swampBack' onClick={handleNavHome} >back</button>
            <div className="interactionBttns">
                <button className='intBttn' onClick={() => increaseStat("health")} >give medicine</button>
                <button className='intBttn' onClick={() => increaseStat("hunger")} >give food</button>
                <button className='intBttn' onClick={() => increaseStat("thirst")} >give water</button>
                <button className='intBttn' onClick={() => increaseStat("boredom")} >give toys</button>
            </div>
            <div className='swampName'>
                <h3>name: {currentPet.name}</h3>
            </div>
            <div className='swampImg'>
                <img c src={currentPet.image_url} />
            </div>
            <div className="swampStats">
                <div className='stat1'>
                    <p>happiness: {updatedHappiness}%</p>
                </div>
                <div className='stat2'>
                    <p>health: {updatedPet.health}%  </p>
                </div>
                <div className='stat3'>
                    <p>hunger: {updatedPet.hunger}%  </p>
                </div>
                <div className='stat4'>
                    <p>thirst: {updatedPet.thirst}%  </p>
                </div>
                <div className='stat5'>
                    <p>boredom: {updatedPet.boredom}%  </p>
                </div>
            </div>
        </div>
    )
}

export default Swamp;