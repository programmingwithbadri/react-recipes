import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <NavBarUnAuth />
        </nav>
    )
}

const NavBarUnAuth = () => {
    return (
        <ul>
            <li>
                <NavLink to="/" exact>Home</NavLink>
            </li>
            <li>
                <NavLink to="/search">Search</NavLink>
            </li>
            <li>
                <NavLink to="/signin">SignIn</NavLink>
            </li>
            <li>
                <NavLink to="/signup">SingUp</NavLink>
            </li>
        </ul>
    )
}

export default NavBar
