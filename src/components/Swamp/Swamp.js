// parseInt((updatedPet.health + updatedPet.hunger + updatedPet.thirst + updatedPet.boredom) /4)
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

import "../Swamp/Swamp.styles.css"

function Swamp({currentPet}){
    const [updatedPet, setUpdatedPet] = useState({
        health: currentPet.health,
        hunger: currentPet.hunger,
        thirst: currentPet.thirst,
        boredom: currentPet.boredom
    })
    const [updatedHappiness, setUpdatedHappiness] = useState(currentPet.happiness)
    
    let navigate = useNavigate();
    
    function handleNavHome(){
        navigate(-1)
        navigate('home')
    }

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
            .then(data => console.log("POSTED:", data))
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