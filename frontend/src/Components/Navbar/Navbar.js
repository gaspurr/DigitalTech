import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.css"

function Navbar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink exact to ="/" className="nav-logo">
                        SectorSelector Inc
                    </NavLink>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-links">
                                Dummy
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
