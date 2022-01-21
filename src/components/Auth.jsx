import React from "react";
import { authService, firebaseInstance } from "../fBase";

function Auth() {

    const onSocialClick = async (event) => {
        let provider = new firebaseInstance.auth.GoogleAuthProvider();
        await authService.signInWithPopup(provider);
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
