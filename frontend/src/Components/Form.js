import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Form.css"

function Form() {
    const [selection, setSelection] = useState([])
    const [exists, setExists] = useState(false)
    const [userInfo, setUserInfo] = useState({
        username: '',
        sectors:[]
    })

    //get all of the sectors
    const fetchSectors = async () => {
        await axios.get("http://localhost:8081/")
            .then(res => {
                const result = res.data
                console.log(result)
                //extract names for the selection
                setSelection(...selection, result)

                console.log(selection)
            }).catch(e => {
                console.log({ message: e })
            })
    }

    //check if data exists, if not = submit, if exists = update
    const handleSubmit = async(e, username, body ) =>{
        e.preventDefault()
        //check if user exists
        await axios.get(`http://localhost:8081/user/${username}`)
        .then((res) =>{
            if(res){
                console.log("User found!")
                setExists(true)
            }
        }).catch(e => {
            console.log({message: e})
        })

        //if exist
        if(exists){
            await axios.post("http://localhost:8081/user/create-user", body)
            .then(res =>{

            }).catch(e =>{
                console.log(e)
            })
        }else{
            //TO-DO
            // update user with a new body
            console.log("updating user")
        }
    }

    useEffect(() => {
        fetchSectors()
    }, [])
    return (
        <div className="container">
            <h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
            <form type="submit" className="form-container" onSubmit={handleSubmit}>
                <label for="username">Name:</label>
                <input id="username" required type="text"></input>
                <label id="select">Select:</label>
                <select required multiple for="select">
                    {selection ? selection.map((sector) => {
                        console.log(sector)
                        return (
                            <optgroup label={sector.groupName} value={sector.groupName}>
                                {
                                    sector.subCategories.map((subSector) => {
                                        console.log(subSector.sectorName)
                                        return <option value="subSector">{subSector.sectorName}</option>
                                    })
                                }
                            </optgroup>
                        )
                    }) : null
                    }
                </select>
                <div className="terms-section">
                    <label i="terms" className="terms-label"> Agree with terms</label>
                    <input for="terms" required type="checkbox" />
                </div>

                <input type="submit" value="Submit" className="submit-btn" />
            </form>

        </div >
    );
}

export default Form;
