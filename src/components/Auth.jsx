import React, { useState } from "react";
import { authService, firebaseInstance } from "../fBase";
import { useDispatch } from "react-redux";

function Auth() {
    const dispatch = useDispatch();

    const onSocialClick = async (event) => {
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        const data = await authService.signInWithPopup(provider);
    }

    return (
        <div>
            <button onClick={onSocialClick}>
                Google로 로그인
            </button>
        </div>
    )
}

export default Auth
