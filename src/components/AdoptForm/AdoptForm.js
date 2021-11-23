import React, {useState} from 'react';

import "./AdoptForm.styles.css"

function AdoptForm({handleGoBack, petData, setPetData, setUserPets, userPets}){

    // console.log("pet data", petData)

    function handleChange(e){
        setPetData({ ...petData, [e.target.name]: e.target.value });
    }
    
    function handleSubmit(e){
        e.preventDefault();
        // console.log("Sending adoption forms");
        if (petData.name && petData.image_url){
            fetch("https://swamp-simulator.herokuapp.com/pets", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(petData)
                })
                    .then(resp => resp.json())
                    .then(newPet => {
                        setUserPets([...userPets, newPet])
                        handleGoBack()
                    })
        }
        else {
            alert('you must select both name and gator')
        }
    }

    return(
        <div className='adoptFormFull'>
            <h1>pick your perfect new pal</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                name="name"
                placeholder="name"
                value={petData.name}
                onChange={handleChange}
                /> 
                <button type="submit">submit</button>
            </form>
            <div className="topRow"> 
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/Bk7DcPp.png"})} src="https://i.imgur.com/Bk7DcPp.png" />
                </div>
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/aNB0iGY.png"})} src="https://i.imgur.com/aNB0iGY.png" />
                </div>
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/rdCitVE.png"})} src="https://i.imgur.com/rdCitVE.png" />
                </div>
            </div>
            <div className="middleRow">
                <div className="adoptFormImg"> 
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/qKCIhaw.png"})} src="https://i.imgur.com/qKCIhaw.png" />
                </div>
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/F8q8wsW.png"})} src="https://i.imgur.com/F8q8wsW.png" />
                </div>
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/4C5Zb2a.png"})} src="https://i.imgur.com/4C5Zb2a.png" />
                </div>
            </div>
            <div className="bottomRow"> 
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/97mjSWz.png"})} src="https://i.imgur.com/97mjSWz.png" />
                </div>
                <div className="adoptFormImg">
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/yapS10p.png"})} src="https://i.imgur.com/yapS10p.png" />
                </div>
                <div className="adoptFormImg" >
                    <img onClick={() => setPetData({...petData, image_url: "https://i.imgur.com/eEL3H2v.png"})} src="https://i.imgur.com/eEL3H2v.png" />
                </div>
            </div>
            
            <button className='cancelButton' onClick={handleGoBack}>cancel</button>
        </div>
    )
}

export default AdoptForm;