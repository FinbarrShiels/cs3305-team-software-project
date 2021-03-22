import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

const auth = firebase.auth();
const actionCodeSettings = {
    url: "https://project-970041699397464178.web.app/Login",
    handleCodeInApp: false
}

//Reset password from landing page if user has forgotten their password and cannot login
export function forgotPassword(email) {
    return new Promise((resolve, reject) => {
        auth.sendPasswordResetEmail(email, actionCodeSettings)
        .then(() => {
            resolve()
        })
        .catch(error => {
            reject(error)
        })
    })
}