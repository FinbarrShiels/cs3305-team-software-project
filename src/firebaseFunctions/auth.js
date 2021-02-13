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



export function firebaseRegister(fname, sname, email, pass) {
  const recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha');
  recaptcha.verify().then(promise => {auth.createUserWithEmailAndPassword(email, pass)
    .then(userCred => {
        console.log(userCred.user.email, userCred.user.emailVerified);
        addNewUserToFirestore(userCred.user.uid, fname, sname, userCred.user.email);
        userCred.user.sendEmailVerification()
          .then(() =>{
            console.log('verifaction email sent');
          })
    }).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            console.log(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            console.log(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            console.log(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
          default:
            console.log(error.message);
            break; 
        }
    })
  })
  
}

export function firebaseRegularLogIn(email, pass) {
  auth.signInWithEmailAndPassword(email, pass)
  .then(userCred => {
    let emailVerification = userCred.user.emailVerified;
    console.log(`${userCred.user.email} is logged in` );
    console.log(`Email address verified: ${emailVerification}` );

  }).catch(error => {
      console.log('incorrect email or password');

  })
}

function addNewUserToFirestore(uid, fname, sname, email) {
    db.collection('users').doc(uid).set({ // the 'users/userID' in firestore will
    // later be used to track what elections a user has voted in, and the ones they've organised
      email: email,
      fname: fname,
      sname: sname
    })
  
}


export function firebaseGoogleLogIn() {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((userCred) => {
            addNewUserToFirestore(userCred.user.uid, userCred.user.email);
            console.log(userCred.user.email);
            console.log(`Email address verified: ${userCred.user.emailVerified}`);
        }).catch((error) => {
            console.log('fail');
        });  
}

export function firebaseTwitterLogIn() {
    let provider = new firebase.auth.TwitterAuthProvider(); // this won't work until I sign up for developer account with Twitter
    auth.signInWithPopup(provider)
        .then((result) => {
            addNewUserToFirestore(result.user.uid, result.user.email);
        }).catch((error) => {
            console.log('fail');
        });  
}

export function firebaseFacebookLogIn() {
  let provider = new firebase.auth.FacebookAuthProvider(); // this won't work until I sign up for developer account with Facebook
    auth.signInWithPopup(provider)
        .then((result) => {
            addNewUserToFirestore(result.user.uid, result.user.email);
        }).catch((error) => {
            console.log('fail');
        });  
}

export function Logout() {
    auth.signOut().catch(error => {console.log(error.message)});
    console.log("Logged out");
}