// parseInt((updatedPet.health + updatedPet.hunger + updatedPet.thirst + updatedPet.boredom) /4)
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import "../Swamp/Swamp.styles.css"

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
        console.log("current:", currentPet)
        if (updatedPet[stat] >= 95) {
            setUpdatedPet({...updatedPet, [stat]: 100})
        }
        else {
            setUpdatedPet({...updatedPet, [stat]: updatedPet[stat] + 5})
        }
        setUpdatedHappiness(parseInt((updatedPet.health + updatedPet.hunger + updatedPet.thirst + updatedPet.boredom) /4))
        console.log("updated:", updatedPet)
        console.log(updatedHappiness)   
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
                console.log("posted", data)
                setFetchSwitch(!fetchSwitch)
            })
    }, [updatedHappiness])
        
    return(
        <div className="swampBody">
            <div className="interactionBttns">
                <button onClick={() => increaseStat("health")} >give medicine</button>
                <button onClick={() => increaseStat("hunger")} >give food</button>
                <button onClick={() => increaseStat("thirst")} >give water</button>
                <button onClick={() => increaseStat("boredom")} >give toys</button>
            </div>
            <div className='swampName'>
                <h3>name: {currentPet.name}</h3>
            </div>
            <div className='swampImg'>
                <img c src={currentPet.image_url} />
            </div>
            <div lassName="swampStats">
                <p>happiness: {updatedHappiness}%</p>
                <p>health: {updatedPet.health}%</p>
                <p>hunger: {updatedPet.hunger}%</p>
                <p>thirst: {updatedPet.thirst}%</p>
                <p>boredom: {updatedPet.boredom}%</p>
            </div>
            <button onClick={handleNavHome} >back</button>
        </div>
    )
}

export default Swamp;