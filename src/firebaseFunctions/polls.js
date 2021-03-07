import firebase from "firebase/app";
import "firebase/auth";
const auth = firebase.auth();
const db = firebase.firestore();


export function createPoll( name, description, anon, ) {
    var date = new Date();
    if (auth.currentUser) {
        //var options=[];
        //options.push(option1,option2,option3);
        var user = db.doc('users/'+auth.currentUser.uid);
        var user = user.get()
            .then((userObj) => {
                var organiserName = userObj.data().fname + " " + userObj.data().sname;
                db.collection('/polls').doc(auth.currentUser.uid+name).set({
                    poll_name: name,
                    anonymousVoting: anon,
                    description: description,
                    owners: [auth.currentUser.uid],
                    type: "poll",
                    winner: "None",
                    organiser: organiserName,
                    open: true,
                    createdAt: date.getDate()+"/"+date.getMonth()+1+"/"+date.getFullYear()
                }).then(() => {
                    //for (var i=0; i < options.length; i++) {
                    //   db.collection('/polls').doc(auth.currentUser.uid+name).collection("options").doc('option'+i).set({
                    //      option_name: options[i],
                    //     votes: 0
                    console.log("poll created successfully");
                    })
                    console.log("success");  
            })
        
                      
        }
    
    else {
        console.log("fill in the options")
    }

}
export function searchPoll(searchString) {
    return new Promise((resolve, reject) => {
        var results = []
        var count = 0
        db.collection('polls/').where('poll_name', '>=', searchString).where('poll_name', '<=', searchString+'~').get()
        .then((snapshot) =>{
            snapshot.docs.forEach(doc => {
                var poll = {
                    type: doc.data().type,
                    data: {
                        title: doc.data().poll_name,
                        organiser:  doc.data().organiser,
                        winner: doc.data().winner,
                        voteCode: count
                    }
                }
                count = count + 1;
                results.push(poll);
            })
            resolve(results)
        }).catch(error => {
            reject(error)
        })
    })
}

export function pollsForUser() {
    return new Promise((resolve, reject) => {
        var userPolls = [];
        var count = 0;
        db.collection('polls/').where("owners", "array-contains", auth.currentUser.uid).get()
        .then((snapshot) => {
            snapshot.forEach(doc => {
                var poll = {
                    type: doc.data().type,
                    data: {
                        title: doc.data().poll_name,
                        organiser:  doc.data().organiser,
                        winner: doc.data().winner,
                        open: doc.data().open,
                        anon: doc.data().anonymousVoting,
                        voteCode: count
                    }
                }
            count = count + 1;
            userPolls.push(poll);
        })
        }).catch((error) => {
            reject(false)
        })
        resolve(userPolls);
    })
}

