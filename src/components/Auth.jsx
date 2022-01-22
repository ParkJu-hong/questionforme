import React from "react";
import { authService, firebaseInstance } from "../fBase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
// import { useMediaQuery } from "react-responsive"

// <i class="fab fa-google"></i>

function Auth() {
    // const isPc = useMediaQuery({
    //     query: "(min-width:768px)"
    // });
    // const isMobile = useMediaQuery({
    //     query: "(max-width:768px)"
    // });

    const onSocialClick = async (event) => {
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <div onClick={onSocialClick}>
                <h1 style={{textAlign: "center"}}>9qfm</h1>
                <section style={{textAlign: "center", margin: "20px"}}>
                    <div>현재라는 바쁜 시공간에 살면서 자신과 대화를 하기에 여유가 쉽게 나지 않습니다.</div>
                    <div>해서 조금이나마 시간을 내시어 나와 대화를 해보세요!</div>
                </section>
                <div style={{textAlign: "center"}}><FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon></div>
            </div>
        </div>
    )
}

export default Auth
