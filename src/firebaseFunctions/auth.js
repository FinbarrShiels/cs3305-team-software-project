// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsRA7R4Wbf_M2aKmJeDdf421UsSkVAT0g",
  authDomain: "project-970041699397464178.firebaseapp.com",
  projectId: "project-970041699397464178",
  storageBucket: "project-970041699397464178.appspot.com",
  messagingSenderId: "485046157660",
  appId: "1:485046157660:web:b5bb4607c80d94b1b18199"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const actionCodeSettings = {
    url: "https://project-970041699397464178.web.app/Login",
    handleCodeInApp: false,
}

export var firebaseRegister = function(fname, sname, email, pass) {
    return new Promise(function(resolve, reject)
    {
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
    recaptcha.verify().then(() => {
        //console.log("reCAPTCHA verified")
        auth.createUserWithEmailAndPassword(email, pass).then(userCred => {
            //console.log("User created successfully");
            //console.log(userCred.user.email, userCred.user.emailVerified);
            addNewUserToFirestore(userCred.user.uid, fname, sname, userCred.user.email);
            userCred.user.sendEmailVerification(actionCodeSettings).then(() => {
                //console.log("Verification email sent");
                recaptcha.clear();
                resolve(true)
            }).catch(error => {
                //console.log("Send email verification error catch", error.code);
                recaptcha.clear();
                reject(error.code);
            })
        }).catch(error => {
            //console.log("Create user error catch", error.code);
            recaptcha.clear();
            reject(error.code);
        })
    }).catch(error => {
        //console.log("Outermost verify error catch", error.code);
        recaptcha.clear();
        reject(error.code);
    })
    });
}

export function firebaseRegularLogIn(email, pass) {
    auth.signInWithEmailAndPassword(email, pass)
    .then(userCred => {
            return userCred.user;
        }).catch(error => {
            return error.code
        })
}

function addNewUserToFirestore(uid, fname, sname, email) {
    console.log("Registering user:", uid, email);
    db.collection('users').doc(uid).set({ // the 'users/userID' in firestore will
    // later be used to track what elections a user has voted in, and the ones they've organised
      email: email,
      fname: fname,
      sname: sname
    }).catch(error => {return error.code})
  
}

export function firebaseGoogleLogIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((userCred) => {
            addNewUserToFirestore(userCred.user.uid, userCred.user.email);
            return userCred
        }).catch((error) => {
            return error.code;
        });  
}

export function firebaseTwitterLogIn() {
    let provider = new firebase.auth.TwitterAuthProvider(); // this won't work until I sign up for developer account with Twitter
    auth.signInWithPopup(provider)
        .then((result) => {
            addNewUserToFirestore(result.user.uid, result.user.email);
            return result
        }).catch((error) => {
            return error.code;
        });  
}

export function firebaseFacebookLogIn() {
  let provider = new firebase.auth.FacebookAuthProvider(); // this won't work until I sign up for developer account with Facebook
    auth.signInWithPopup(provider)
        .then((result) => {
            addNewUserToFirestore(result.user.uid, result.user.email);
            return result
        }).catch((error) => {
            return error.code;
        });  
}

export function Logout() {
    auth.signOut().catch(error => {
        return error.code
    })
}