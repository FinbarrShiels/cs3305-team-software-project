// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"
// Add the Firebase products that you want to use
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBsRA7R4Wbf_M2aKmJeDdf421UsSkVAT0g",
  authDomain: "project-970041699397464178.firebaseapp.com",
  projectId: "project-970041699397464178",
  storageBucket: "project-970041699397464178.appspot.com",
  messagingSenderId: "485046157660",
  appId: "1:485046157660:web:b5bb4607c80d94b1b18199"
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const auth = firebase.auth()
const actionCodeSettings = {
    url: "https://project-970041699397464178.web.app/Login",
    handleCodeInApp: false,
}

export function authSubscribe(setUser) {
    auth.onAuthStateChanged(setUser)
}

export var firebaseRegister = function(fname, sname, email, pass, username) { // takes in input fields from the sign up form
    return new Promise(function(resolve, reject)
    {
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha'); // load the recaptcha verifier
    recaptcha.verify().then(() => { // if the recaptcha verifier passes, signifying the user is not a bot 
        auth.createUserWithEmailAndPassword(email, pass).then(userCred => { // create the user with firebase 
            addNewUserToFirestore(userCred.user.uid, fname, sname, userCred.user.email, username); // add the users details to a document in firestore
            userCred.user.sendEmailVerification(actionCodeSettings).then(() => { // send the user a verification email
                // clear the recaptcha verifier 
                    recaptcha.clear() 
                    resolve(true)                 
            }).catch(error => {
                recaptcha.clear() // clear the recaptcha verifier 
                reject(error.code)
            })
        }).catch(error => {
            recaptcha.clear() // clear the recaptcha verifier 
            reject(error.code)
        })
    }).catch(error => {
        recaptcha.clear() // clear the recaptcha verifier 
        reject(error.code)
    })
    })
}
// takes in email and password parameters and authenticates the user based on the parameters
export var firebaseRegularLogIn = (email, pass) => { 
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(email, pass) // call the firebase method to authenticate users with email and password inputs
        .then(userCred => { // a user credential is returned which will have attributes such as uid and email
            let auth_user = userCred.user
            db.doc('users/'+auth.currentUser.uid).get() // query with path to document associated with the user that has been authenticated
            .then(userDoc => { // returns the document associated with the user 
                resolve({ // resolve a JSON object with data that the front end will use 
                    username: auth_user.displayName,
                    email: auth_user.email,
                    uid: auth_user.uid,
                    verified: auth_user.emailVerified,
                    fname: userDoc.data().fname,
                    sname: userDoc.data().sname,
                    bio: userDoc.data().bio
                })
            })
            .catch(error => {
                console.log('Error getting userDocs')
                console.log(error)
                reject(error)
            })
        }).catch(error => {
            reject(error.code)
        })})
}

export function getUserByUid(uid) { // find the details of the user assocaited with the uid input
    return new Promise((resolve, reject) => {
        db.doc('users/'+uid).get() // query with path to the current user's document 
        .then((userDoc) => { // returns the user document
            resolve({ // resolve a JSON object with data fields that the front end will use for their profile page
                email: userDoc.data().email,
                fname: userDoc.data().fname,
                sname: userDoc.data().sname,
                bio: userDoc.data().bio,
                username: userDoc.data().username
            })
        })
        .catch(error => {
            console.log('Error getting userDocs')
            console.log(error)
            reject(error)
        })
    })
}

function addNewUserToFirestore(uid, fname, sname, email, username) { // when a new user signs up to our website, we add their details to a document in firestore
    return new Promise((resolve, reject) => {
        console.log("Registering user:", uid, email);
        var alreadyExists = false; // used to see if the user already exists in our firestore user collection
        var query = db.doc('users/'+uid); // query with path to the user document, if it already exists 
        query.get()
            .then((user) => { // if a document is found
                alreadyExists = true; // then the user already exists in our firestore user collection
            }).catch((error) => { // if a document is not found
                alreadyExists = false // then the user doesn't exist in our firestore user collection
            })
        if (alreadyExists === false) { // if user isn't in the Firestore collection
            db.collection('users').doc(uid).set({ // the 'users/userID' in firestore will
            // later be used to track what elections a user has voted in, and the ones they've organised
            username: username,
            email: email,
            fname: fname,
            sname: sname
            })
            resolve(true);
        }
        else {
            reject(uid)
        }
    })
}


export function addNewUserToFirestoreTwitterOrFB(uid, username, displayName) {
    return new Promise((resolve, reject) => {
        console.log('here')
        var names = displayName.split(' ')
        var fname = names[0]
        var lname = ""
        for (var i=1; i<names.length; i++) {
            lname = lname + names[i] + " ";
        }
        db.collection('users').doc(uid).set({ // the 'users/userID' in firestore will
        // later be used to track what elections a user has voted in, and the ones they've organised
        username: username,
        email: null,
        fname: fname,
        sname: lname
        })
        .then(()=>{
            resolve(true);
        })
        .catch((err) => {
            reject(false)
        })
    })
}

export var firebaseGoogleLogIn= function() { // function to authenticate a user in via their Google account
    return new Promise(function(resolve, reject) {
        let provider = new firebase.auth.GoogleAuthProvider(); // create a instance of the google provider object
        auth.signInWithPopup(provider) // authenticate the user with Firebase using the provider object and a pop up window
            .then((userCred) => { // if user successfully logs in, a userCredential is provided
                if (userCred.additionalUserInfo.isNewUser) {
                    var userName = userCred.user.displayName;
                    userName = userName.split(" ")
                    var sname = userName[0]
                    var lname = ""
                    for (var i=1; i<userName.length; i++) {
                        lname = lname + userName[i] + " ";
                    }
                    addNewUserToFirestore(userCred.user.uid, sname, lname, userCred.user.email, null)
                    .then((result) => {
                        resolve(result)
                    }).catch((err) => {
                         resolve(err)
                    })
                }
                console.log(userCred)
            }).catch((error) => {
                reject(error.code);
            });  

    })
    
}

export var firebaseTwitterLogIn= function() {
    return new Promise(function(resolve, reject){
    let provider = new firebase.auth.TwitterAuthProvider(); 
    auth.signInWithPopup(provider) // authenticate the user with Firebase using the provider object and a pop up window
        .then((userCred) => {
           console.log(userCred, userCred.additionalUserInfo);
           if (userCred.additionalUserInfo.isNewUser) {
               addNewUserToFirestoreTwitterOrFB(userCred.user.uid, userCred.additionalUserInfo.username, userCred.user.displayName)
               .then((result) => {
                   resolve(result)
               }).catch((err) => {
                    resolve(err)
               })
           }
        })
        .catch((error) => {
            reject(error.code)
        });           
        })
    }
    
export var firebaseFacebookLogIn= function() {
    return new Promise(function(resolve, reject){
        let provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider) // authenticate the user with Firebase using the provider object and a pop up window
        .then((userCred) => {
           console.log(userCred, userCred.additionalUserInfo);
           if (userCred.additionalUserInfo.isNewUser) {
               addNewUserToFirestoreTwitterOrFB(userCred.user.uid, userCred.additionalUserInfo.username, userCred.user.displayName, userCred.additionalUserInfo.username)
               .then((result) => {
                   resolve(result)
               }).catch((err) => {
                    resolve(err)
               })
           }
        })
        .catch((error) => {
            reject(error.code)
        });           
        })
    }

export var Logout= function() {
    return new Promise(function(resolve, reject){
        auth.signOut().then(() => {
            resolve(true)
        })
        .catch(error =>{
            reject(error.code)
        })

    })
}

export function userState() {
    if (auth.currentUser) {
        return auth.currentUser
    }
    else {
        return false
    }
}

export function findUser(uid) {
    return new Promise((resolve, reject) => {
        db.doc('users/'+uid).get()
        .then((userDoc) => {
            resolve({
                email: userDoc.data().email,
                fname: userDoc.data().fname,
                sname: userDoc.data().sname,
                bio: userDoc.data().bio
            })
        })
        .catch(error => {
            console.log('Error getting userDocs')
            console.log(error)
            reject(error)
        })
    })
}

export function isUsernameUnique(username) {
    return new Promise(function(resolve, reject) {
        var isUnique = true
        db.collection('users/').where("username", "==", username).get()
        .then((querySnapshot) => {
            if (querySnapshot.size===0) {
                resolve(isUnique)
            }
            else {
                resolve(isUnique)
            }
        })
        .catch((error) => {
            console.log("error in isUSernameUnique")
        })
    })
}

export function logInWithUsername(username, password) {
    return new Promise(function(resolve, reject){
    db.collection('users/').where("username", "==", username).get()
    .then((querySnapshot) => {
        firebaseRegularLogIn(querySnapshot.docs[0].data().email, password)
            .then((userObj) => {
                resolve(userObj)
            })
            .catch((error) => {
                reject(error)
            })
    })
    .catch((error)=>{
        reject(error)
    })
    })
}
