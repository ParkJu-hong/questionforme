import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

/*
REACT_APP_API_KEY=AIzaSyCZe2abS_Lq_lEELjVQj0pakeTTOzQtXFk
REACT_APP_AUTH_DOMAIN=nomadcoding-d8c5f.firebaseapp.com
REACT_APP_PROJECT_ID=nomadcoding-d8c5f
REACT_APP_STORAGE_BUCKET=nomadcoding-d8c5f.appspot.com
REACT_APP_MESSAGIN_ID=21189401175
REACT_APP_APP_ID=1:21189401175:web:37f77bf0fc5abb6cba6112
 */
/*
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
    appId: process.env.REACT_APP_APP_ID
};
*/
const firebaseConfig = {
    apiKey: "AIzaSyCZe2abS_Lq_lEELjVQj0pakeTTOzQtXFk",
    authDomain: "nomadcoding-d8c5f.firebaseapp.com",
    projectId: "nomadcoding-d8c5f",
    storageBucket: "nomadcoding-d8c5f.appspot.com",
    messagingSenderId: "21189401175",
    appId: "1:21189401175:web:37f77bf0fc5abb6cba6112"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();