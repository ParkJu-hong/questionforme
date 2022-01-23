import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
// import { useMediaQuery } from "react-responsive"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestion } from '@fortawesome/free-solid-svg-icons'

function Navigation() {
    const userObj = useSelector(state => state.reducerLoggedIn.userObj);
    const dispatch = useDispatch();
    return (
        <>
            <Nav >
                <Div style={{}}><Link to="/profile" style={{textDecoration: "none", color: 'white'}}>{userObj.displayName}'s Profile</Link></Div>
                <Div style={{}}><Link to="/" style={{textDecoration: "none", color: 'white'}}><FontAwesomeIcon icon={faHome} /></Link></Div>
                <Div style={{}}><Link to="/calender" 
                style={{textDecoration: "none", color: 'white'}}
                onClick={() => {
                    dispatch({ type: "CHANGE_CALENDER" })
                }}><FontAwesomeIcon icon={faQuestion} /></Link></Div>
            </Nav>
        </>
    )
}

const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    background-color: black;
    padding: 50px;
    margin: 30px;
    border: solid 1px skyblue;
    border-radius: 3px;
`
const Div = styled.div`
    list-style:none;
`

export default Navigation
