import firebase from "firebase/app";
import 'firebase/auth';

const auth = firebase.auth()
const actionCodeSettings = {
    url: 'https://project-970041699397464178.web.app/Login',
    handleCodeInApp: false
}

export function handleUserParams() {
    const url = new URL(document.URL);
    let params = url.search.split("&");
    let queryValues = [];
    for (let q = 0; q < params.length; q++) {
        let temp = params[q].split("=");
        queryValues.push(temp[1])
    }
    console.log("queryValues: >", queryValues);
    return queryValues
}

export function resetPassword(actionCode, continueURL) {
    let newPass = document.querySelector('#password').value;
    let newPassConfirm = document.querySelector('#password2').value;
    console.log("Pass: ", newPass, newPassConfirm);
    return new Promise(((resolve, reject) => {
        if ((newPass === newPassConfirm) && (newPass !== "")) {
            auth.confirmPasswordReset(actionCode, newPass).then(() => {
                console.log("Password reset confirmed")
                resolve(true);
                //Sign in user directly, or redirect to login page
            }).catch(error => {
                if (error.code === "auth/weak-password") {
                    console.log("New password is not strong enough. Use a mix of characters and cases");
                    reject(error.code);
                } else {
                    console.log(error.message, "> CONFIRM pass reset error");
                    reject(error.code);
                }
            });
        } else {
            console.log("Passwords do not match");
            reject("Mismatched password");
        }
    })).catch(e => {return e})
}

export function verifyResetCode(actionCode) {
    console.log("Called resetPassword()");
    return new Promise((resolve, reject) => {
        auth.verifyPasswordResetCode(actionCode).then(() => {
            console.log("Pass reset code verified");
            resolve(true);
        }).catch(error => {
            switch (error.code) {
                case 'auth/expired-action-code':
                    console.log("The password reset code has expired");
                    reject(error.code);
                    break;
                case 'auth/invalid-action-code':
                    console.log("The password reset code is invalid");
                    reject(error.code);
                    break;
                case 'auth/user-disabled':
                    console.log("The account corresponding to the given password reset code has been disabled");
                    reject(error.code);
                    break;
                case 'auth/user-not-found':
                    console.log("There is no user corresponding to the password reset code");
                    reject(error.code);
                    break;
                default:
                    console.log(error.message, "> VERIFY pass reset code failed");
                    reject(error.code);
                    break;
            }
        })
    })
}

export function recoverEmail(actionCode, continueURL) {}
export function verifyEmail(user, actionCode, continueURL) {
    console.log("User: ", user);
    if (user) {
        auth.currentUser.sendEmailVerification(actionCodeSettings).then(() => {
            console.log("Verification email sent");
        }).catch(error => {
            switch (error.code) {
                case 'auth/unauthorized-continue-uri':
                    console.log("Unauthorised continue URL. (authorise in Firebase console");
                    break;
                case 'auth/invalid-continue-uri':
                    console.log("Invalid continue URL. Please check the request");
                    break;
                case 'auth/missing-continue-uri':
                    console.log("Continue URL must be provided. Please check the request");
                    break;
                default:
                    console.log(error.message);
                    break;
            }

        });
    } else {
        console.log("User is not currently logged in");
    }
}

export function resendVer() {
    auth.currentUser.sendEmailVerification().then(() => console.log("Email sent")).catch(e => {console.log(e)})
}