import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navigation() {
    const userObj = useSelector( state => state.reducerLoggedIn.userObj)
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/profile">{userObj.displayName}'s Profile</Link></li>
                <li><Link to="/calender">Calender</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation
