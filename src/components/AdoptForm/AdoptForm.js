import React, {useState} from 'react';


function AdoptForm({handleGoBack, petData, setPetData, setUserPets, userPets}){

    console.log(petData)

    function handleChange(e){
        setPetData({ ...petData, [e.target.name]: e.target.value });
    }
    
    function handleSubmit(e){
        e.preventDefault();
        console.log("Sending adoption forms");
        fetch("https://swamp-simulator.herokuapp.com/pets", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(petData)
        })
            .then(resp => resp.json())
            .then(newPet => setUserPets([...userPets, newPet]))
        handleGoBack()
    }

    return(
        <div>
            <h1>Pick your perfect new pal</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="name"
                placeholder="name"
                value={petData.name}
                onChange={handleChange}
                /> 
                <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/4w3prNn.png"})} src="https://i.imgur.com/4w3prNn.png" />
                <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/BObFymR.png"})} src="https://i.imgur.com/BObFymR.png" />
                <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/mBq8oyE.png"})} src="https://i.imgur.com/mBq8oyE.png" />
                <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/Jtau06L.png"})} src="https://i.imgur.com/Jtau06L.png" />
                <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/jbu9A9a.png"})} src="https://i.imgur.com/jbu9A9a.png" />
                <button type="submit">Submit</button>
            </form>
            <button onClick={handleGoBack}>Cancel</button>
        </div>
    )
}

export default AdoptForm;