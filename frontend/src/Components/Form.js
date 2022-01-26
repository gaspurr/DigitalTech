import React, { useState, useEffect } from 'react';
import axios from "axios"
import "./Form.css"

function Form() {
    const [selection, setSelection] = useState([])
    const [exists, setExists] = useState(false)
    const [username, setUsername] = useState('')
    const [userSectors, setUserSectors] = useState([])
    const [options, setOptions] = useState([])

    //get all of the sectors
    const fetchSectors = async () => {
        await axios.get("http://localhost:8081/")
            .then(res => {
                const result = res.data
                //extract names for the selection
                setSelection(...selection, result)

            }).catch(e => {
                console.log({ message: e })
            })

    }

    //check if data exists, if not = submit, if exists = update
    const checkUserExistance = async (e, username) => {

        //check if user exists
        e.preventDefault()

        await axios.get(`http://localhost:8081/user/${username}`)
            .then((res) => {
                if (res) {
                    console.log("User found!")
                    console.log(res.data)
                    setExists(true)
                    updateUser()
                }
            }).catch(e => {
                setExists(false)
                console.log({ message: "No user matches this username, creating a new user" })
                handleUserCreation()
            })
    }

    const updateUser = async () => {

        //if user exists
        // update user with a new body
        const array = []
        userSectors.forEach(object => {
            const foo = { sectorName: object }
            array.push(foo)

        })

        await axios.put(`http://localhost:8081/user/update/${username}`, userSectors)
            .then(res => {
                console.log("Succesful update: " + res.data)
                console.log("payload: " + JSON.stringify(userSectors))
            })
            .catch(e => {
                console.log(e)
                console.log("upepe")
            })
    }

    const handleUserCreation = async () => {

        //if this user doesn't exist
        //create a new user
        const array = []
        userSectors.forEach(object => {
            const foo = { sectorName: object }
            array.push(foo)

        })

        await axios.post("http://localhost:8081/user/create-user", array)
            .then(res => {
                console.log(res.data)
                console.log("New user created " + JSON.stringify(array))
            }).catch(e => {
                console.log(e)
                console.log("e")
            })

    }

    const handleSelection = (selections) => {
        selection.preventDefault()
        setOptions(prev => [...prev, selections])
    }

    useEffect(async () => {
        await fetchSectors()
    }, [exists])

    return (
        <div className="container">
            <h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
            <form type="submit" className="form-container" onSubmit={(e) => { checkUserExistance(e, username) }}>
                <label>Name:
                    <input placeholder="John Doe..." id="username" value={username} required type="text" onChange={(e) => {
                        setUsername(e.target.value)
                    }}></input>
                </label>

                <label>Select:</label>
                <select id="sectors" name="sectors" multiple required onChange={(e) => {
                    setUserSectors(prev => [...prev, e.target.value])
                }}>
                    {selection.length > 0 ? selection.map((sector) => {
                        return (
                            <optgroup key={sector._id} label={sector.groupName} value={sector.groupName}>
                                {
                                    sector.subCategories.map((subSector, index) => {
                                        return <option key={index} value={subSector.sectorName}>{subSector.sectorName}</option>
                                    })
                                }
                            </optgroup>
                        )
                    }) : null
                    }
                </select>
                <div className="terms-section">
                    <label i="terms" className="terms-label"> Agree with terms</label>
                    <input required type="checkbox" />
                </div>

                <input type="submit" value="Submit" className="submit-btn" />
            </form>

        </div >
    );
}

export default Form;
