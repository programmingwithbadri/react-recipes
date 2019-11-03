import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ session }) => {
    console.log(session)
    return (
        <nav>
            {
                session && session.getCurrentUser
                    ? <NavBarAuth />
                    : <NavBarUnAuth />
            }
        </nav>
    )
}

const NavBarAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search">Search</NavLink>
        </li>
        <li>
            <NavLink to="/recipe/add">Add a Recipe</NavLink>
        </li>
        <li>
            <NavLink to="/profile">Profile</NavLink>
        </li>
        <li>
            <button>Sign Out</button>
        </li>
    </ul>
);

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
                <NavLink to="/signup">SignUp</NavLink>
            </li>
        </ul>
    )
}

export default NavBar
