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
            <Nav style={{ display: "flex", justifyContent: "space-around", width: "100vw" }}>
                <Div style={{}}><Link to="/questionforme/profile/" style={{textDecoration: "none", color: 'black'}}>{userObj.displayName}'s Profile</Link></Div>
                <Div style={{}}><Link to="/questionforme/" style={{textDecoration: "none", color: 'black'}}><FontAwesomeIcon icon={faHome} /></Link></Div>
                <Div style={{}}><Link to="/questionforme/calender/" 
                style={{textDecoration: "none", color: 'black'}}
                onClick={() => {
                    dispatch({ type: "CHANGE_CALENDER" })
                }}><FontAwesomeIcon icon={faQuestion} /></Link></Div>
            </Nav>
        </>
    )
}

const Nav = styled.nav`
    display: flex;
    /* border: solid 1px red; */
`
const Div = styled.div`
    list-style:none;
`

export default Navigation
