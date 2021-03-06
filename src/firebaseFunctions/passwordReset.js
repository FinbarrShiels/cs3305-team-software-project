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
    auth.sendPasswordResetEmail(email, actionCodeSettings)
    .catch(error => {
        switch (error.code) {
            case 'auth/invalid-email':
                console.log("Not a valid email address");
                break;
            case 'auth/user-not-found':
                console.log("User does not exist, please enter a valid user");
                break;
            default:
                console.log(error.message);
                break;
        }
    })
}

// Reset password for logged in user
export function resetPassword() {
    let user = auth.currentUser;
    let newPass = document.querySelector('#newPass').value;
    let newPassConfirm = document.querySelector('#passConfirm').value;
    let authProvider = document.querySelector('#authProvider').value;
    let provider;
    switch (authProvider) {
        case 'google':
            provider = new auth.GoogleAuthProvider();
            break;
        case 'facebook':
            provider = new auth.FacebookAuthProvider();
            break;
        case 'email':
            provider = new auth.EmailAuthProvider();
            break;
        default:
            provider = new auth.EmailAuthProvider();
            break;
    }
    // Reauthenticate user
    // Not working
    console.log(provider);
    auth.signInWithPopup(provider).then(cred => {
        user.reauthenticateWithCredential(cred.credential).then(() => {
            if (newPass === newPassConfirm) {
                user.updatePassword("newPass").catch(error => {
                    switch (error.code) {
                        case 'auth/weak-password':
                            console.log("Password is too weak. Please try again with a mixture of different characters")
                            break;
                        case 'auth/requires-recent-login':
                            console.log("Requires recent login");
                            //Redirect to login page.
                            //Should never occur since login is required before password reset anyway
                            break;
                        default:
                            console.log(error.message);
                            break;
                    }
                })
            } else {
                console.log("Passwords do not match, please try again.");
            }
        },
            ).catch(error => {
            switch (error.code) {
                case 'auth/user-mismatch':
                    //Possible security risk allowing confirmation of correct credential for at least 1 user?
                    console.log("The credential given does not match the user");
                    break;
                case 'auth/user-not-found':
                    console.log("The credential given does not match any existing user.");
                    break;
                case 'auth/invalid-credential':
                    console.log("Invalid credential");
                    break;
                case 'auth/invalid-email':
                    console.log("Invalid email or password");
                    break;
                case 'auth/wrong-password':
                    console.log("Invalid email or password");
                    break;
                default:
                    console.log(error.message);
                    break;
            }
        });
    },
        ).catch(error => {console.log(error.message)});
}