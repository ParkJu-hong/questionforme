import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
// import { useMediaQuery } from "react-responsive"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faQuestion } from '@fortawesome/free-solid-svg-icons'
// <i class="fas fa-home"></i>
// <i class="fas fa-calendar"></i>
//<i class="fas fa-question"></i>

function Navigation() {
    const userObj = useSelector(state => state.reducerLoggedIn.userObj);
    const dispatch = useDispatch();
    // const isPc = useMediaQuery({
    //     query: "(min-width:768px)"
    // });
    // const isMobile = useMediaQuery({
    //     query: "(max-width:768px)"
    // });
    return (
        <>
            <Nav style={{ display: "flex", justifyContent: "space-around", width: "100vw" }}>
                <Div style={{}}><Link to="/profile" style={{textDecoration: "none", color: 'black'}}>{userObj.displayName}'s Profile</Link></Div>
                <Div style={{}}><Link to="/" style={{textDecoration: "none", color: 'black'}}><FontAwesomeIcon icon={faHome} /></Link></Div>
                <Div style={{}}><Link to="/calender" 
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
