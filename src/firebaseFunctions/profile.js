import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
const auth = firebase.auth();
const db = firebase.firestore();

export function getBio() {
    return new Promise((resolve, reject) => {
        let ref = db.doc("/users/"+auth.currentUser.uid);
        ref.get()
        .then((userProfile) => {
            resolve(userProfile.data().bio)
        })
        .catch(error => {
            reject(error)
        })
    })

}

export function setBio(newBio) {
    let ref = db.doc("/users/"+auth.currentUser.uid);
    ref.update({
        bio: newBio
    });
}