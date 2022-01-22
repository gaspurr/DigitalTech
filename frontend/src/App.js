import React from "react"
import { Routes, BrowserRouter, Route } from "react-router-dom"
import NoPage from "./Components/NoPage/NoPage"
import Navbar from "./Components/Navbar/Navbar"
import Form from "./Components/Form"

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Form />} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter >
        </>
    )
}

export default App