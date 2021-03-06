import firebase from "firebase/app";
import "firebase/auth";
const auth = firebase.auth();
const db = firebase.firestore();


export function createPoll( name, description, anon, ) {
    if (auth.currentUser) {
        //var options=[];
        //options.push(option1,option2,option3);
        db.collection('/polls').doc(auth.currentUser.uid+name).set({
            poll_name: name,
            anonymousVoting: anon,
            description: description,
            owners: [auth.currentUser.uid],
            open: true
        }).then(() => {
            //for (var i=0; i < options.length; i++) {
            //   db.collection('/polls').doc(auth.currentUser.uid+name).collection("options").doc('option'+i).set({
            //      option_name: options[i],
            //     votes: 0
            console.log("poll created successfully");
            })
            console.log("success");                
        }
    
    else {
        console.log("fill in the options")
    }

}
