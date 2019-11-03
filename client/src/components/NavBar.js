import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import SignOut from './Auth/SignOut'

const NavBar = ({ session }) => {
    console.log(session)
    return (
        <nav>
            {
                session && session.getCurrentUser
                    ? <NavBarAuth session={session} />
                    : <NavBarUnAuth />
            }
        </nav>
    )
}

const NavBarAuth = ({ session }) => (
    <Fragment>
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
                <SignOut />
            </li>
        </ul>
        <h4>Welcome, <strong>{session.getCurrentUser.userName}</strong> </h4>
    </Fragment>
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
