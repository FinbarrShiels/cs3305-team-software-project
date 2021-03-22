import firebase from "firebase/app";
import 'firebase/auth';

const auth = firebase.auth()
const actionCodeSettings = {
    url: 'https://project-970041699397464178.web.app/Login',
    handleCodeInApp: false
}

//Parse the URL and extract the query parameters
export function handleUserParams() {
    const url = new URL(document.URL);
    let params = url.search.split("&");
    let queryValues = [];
    for (let q = 0; q < params.length; q++) {
        let temp = params[q].split("=");
        queryValues.push(temp[1])
    }
    // Return the list of parameters
    return queryValues
}

export function resetPassword(actionCode, continueURL) {
    let newPass = document.querySelector('#password').value;
    let newPassConfirm = document.querySelector('#password2').value;
    console.log("Pass: ", newPass, newPassConfirm, auth.currentUser);
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

// Confirm password reset Code from the email link query
export function verifyResetCode(actionCode) {
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

// Apply the confirmed action code and verify the relevant email
export function verifyEmail(actionCode, continueURL) {
    return new Promise((resolve, reject) => {
        auth.applyActionCode(actionCode).then(() => {
            console.log("Email verified successfully")
            resolve(true)
        }).catch(error => {
            switch (error) {
                case 'auth/expired-action-code':
                    console.log("The action code has expired.")
                    reject(error)
                    break;
                case 'auth/invalid-action-code':
                    console.log("The action code is invalid")
                    reject(error)
                    break;
                case 'auth/user-disabled':
                    console.log("The user corresponding to the given action code has been disabled")
                    reject(error)
                    break;
                case 'auth/user-not-found':
                    console.log("User does note exist");
                    reject(error)
                    break;
                default:
                    console.log(error)
                    reject(error)
                    break;
            }
        })
    })
}
// Send verification email
export function sendVerifyEmail() {
    if (!auth.currentUser.emailVerified) {
        auth.currentUser.sendEmailVerification().then(() => console.log("Email sent")).catch(e => {
            console.log(e)
        })
    } else {
        alert("Account already verified");
    }
}