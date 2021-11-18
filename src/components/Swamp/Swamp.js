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
        if (updatedPet[stat] >= 90) {
            setUpdatedPet({...updatedPet, [stat]: 100})
        }
        else {
            setUpdatedPet({...updatedPet, [stat]: updatedPet[stat] + 10})
        }
        setUpdatedHappiness(parseInt((updatedPet.health + updatedPet.hunger + updatedPet.thirst + updatedPet.boredom) /4))
        console.log("updated:", updatedPet)
        console.log(updatedHappiness)   
    }

    //Function to stop the stats timer, increase stats, then restart the timer
    // function handleIncreaseAndTimer(stat){
    //     // stop()
    //     increaseStat(stat)
    //     // start()
    // }
    
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
        <div>
            <h1>Swamp</h1>
            <button onClick={() => increaseStat("health")} >Give Medicine</button>
            <button onClick={() => increaseStat("hunger")} >Give Food</button>
            <button onClick={() => increaseStat("thirst")} >Give Water</button>
            <button onClick={() => increaseStat("boredom")} >Give Toys</button>
            <h3>Name: {currentPet.name}</h3>
            <img className="swampImg" src={currentPet.image_url} />
            <p>Overall Happiness: {updatedHappiness}%</p>
            <p>Health: {updatedPet.health}%</p>
            <p>Hunger: {updatedPet.hunger}%</p>
            <p>Thirst: {updatedPet.thirst}%</p>
            <p>Boredom: {updatedPet.boredom}%</p>
            <button onClick={handleNavHome} >Back</button>
        </div>
    )
}

export default Swamp;