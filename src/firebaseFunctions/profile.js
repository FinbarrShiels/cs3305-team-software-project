import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";
const auth = firebase.auth();
const db = firebase.firestore();

export function getBio() {
    ref = db.doc("/users/"+auth.currentUser.uid);
    ref.get()
        .then((userProfile) => {
            return userProfile.data().bio
        })

}

export function setBio(newBio) {
    ref = db.doc("/users/"+auth.currentUser.uid);
    ref.update({
        bio: newBio
    });
}