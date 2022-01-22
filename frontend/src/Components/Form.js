import React, { useState, useEffect } from 'react';
import axios from "axios"

function Form() {
    const [selection, setSelection] = useState([])

    //get all of the farms
    const farmFetch = async () => {
        await axios.get("http://localhost:8081/farms")
            .then(res => {
                const result = res.data
                //extract names for the selection
                for (var i in result) {
                    const farmName = result[i]["farmName"]
                    const foo = {
                        farmName: farmName,
                        id: result[i]["_id"],
                        data: result[i]["data"][i]["sensorType"]

                    }
                    console.log(foo)

                    setSelection(prev => [...prev, foo])
                }
                console.log(selection)
            }).catch(e => {
                console.log({ message: e })
            })
    }

    useEffect(() => {
        farmFetch()
    }, [])
    return (
        <div style={{ alignItems: "center", textAlign: "center", display: "block" }}>
            <h4>Please enter your name and pick the Sectors you are currently involved in.</h4>
            <form type="submit" style={{display: "block", justifyContent: "center"}}>
                <label>Name:</label>
                <input required type="text"></input>

                <select required multiple size="5">
                    <label>Select:</label>
                    <optgroup label="Manufacturing">
                        <option>one</option>
                        <option>dede</option>
                        <option>ede</option>
                        <option>ede</option>
                        <option>one</option>
                    </optgroup>
                    <optgroup label="Transportation">
                        <option>one</option>
                        <option>dede</option>
                        <option>ede</option>
                        <option>ede</option>
                        <option>one</option>
                    </optgroup>
                </select>
                <button>Save</button>
            </form>
            <input required type="checkbox" />
            <label> Agree with terms</label>
        </div>
    );
}

export default Form;
