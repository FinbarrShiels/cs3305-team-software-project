import firebase from "firebase/app";
import "firebase/auth";
const auth = firebase.auth();
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


export function createPoll(name, description, anon, options) {  // takes in 4 parameters 2 strings, a boolean, and an array of strings
    return new Promise((resolve, reject) => { 
        var date = new Date() //date variable to store the time a vote is created
        db.doc('users/' + auth.currentUser.uid).get() // get the document associated with the users account
            .then((userObj) => { 
                var organiserName = userObj.data().fname + " " + userObj.data().sname; // concatenate fname and sname to get the users full name
                db.collection('/polls').doc(auth.currentUser.uid + name).set({ //create a poll document with the id auth.currentUser.uid + name.
                        //set the fields to the relevant inputs to the function
                        poll_name: name,
                        poll_name_insensitive: name.toLowerCase(), // poll_name_insensitive is stored to make the search function case insensitive
                        anonymousVoting: anon, 
                        description: description,
                        owners: [auth.currentUser.uid], //owners is an array to enable functionality later to allow giving more users owner privileges
                        type: "poll",
                        winner: "None",
                        organiser: organiserName,
                        organiser_insensitive: organiserName.toLowerCase(),
                        open: true,
                        createdAt: date.getDate() + "/" + date.getMonth() + 1 + "/" + date.getFullYear(),
                        timestamp:  timestamp()
                    })
                    .then(() => {
                        for (var i = 0; i < options.length; i++) { //iterate through the options array
                            db.collection('/polls').doc(auth.currentUser.uid + name).collection("options").doc('option' + i).set({ //create an option document for each option
                                option_name: options[i],
                                votes: 0 //initialize it's votes at 0
                            })
                        }
                        resolve(true)
                    })
                    .catch(error => {
                        console.log("something went wrong while creating the poll")
                        reject(error)
                    })
            })
    })
}

export function searchPoll(searchString) { // takes 1 input which is a string 
    return new Promise((resolve, reject) => {
        var results = [] // array for possible results
        var count = 0 //
        db.collection('polls/').where('poll_name_insensitive', '>=', searchString.toLowerCase()).where('poll_name_insensitive', '<=', searchString.toLowerCase() + '~').get()
            .then((snapshot) => {
                snapshot.docs.forEach(doc => {
                    var poll = {
                        type: doc.data().type,
                        data: {
                            title: doc.data().poll_name,
                            organiser: doc.data().organiser,
                            ownerId: doc.data().owners[0],
                            winner: doc.data().winner,
                            voteCode: count
                        }
                    }
                    if (count>=24) {
                        resolve(results)
                    }
                    count = count + 1;
                    results.push(poll);
                    })
                    db.collection('polls/').where('organiser_insensitive', '>=', searchString.toLowerCase()).where('organiser_insensitive', '<=', searchString.toLowerCase() + '~').get()
                    .then((snapshot) => {
                        snapshot.docs.forEach(doc => {
                            var poll = {
                                type: doc.data().type,
                                data: {
                                    title: doc.data().poll_name,
                                    organiser: doc.data().organiser,
                                    ownerId: doc.data().owners[0],
                                    winner: doc.data().winner,
                                    voteCode: count
                                    }
                                }
                                if (count>=24) {
                                    resolve(results)
                                }
                                count = count + 1;
                                results.push(poll);
                            })
                        resolve(results)
                        })
                        .catch(error => {
                            reject(error)
                        }) 
            }).catch(error => {
                reject(error)
            })

        })
}

export function getRecentVotes() {
    return new Promise((resolve, reject)=> {
        var recentVotes =[];
        db.collection('/polls/').orderBy('timestamp', 'desc').get()
        .then((querySnapshot) => {
            querySnapshot.docs.forEach((doc) => {   
                recentVotes.push(doc);
            })
        })
    })
   
}
export function pollsForUser() { // function for returning an array of all the polls a user owns
    return new Promise((resolve, reject) => {
        var userPolls = []; // array to store all the array JSON objects 
        var count = 0; // count used for vote count field in the JSON object that the front end will use
        db.collection('polls/').where("owners", "array-contains", auth.currentUser.uid).get() // find all polls that a user is an owner of
            .then((snapshot) => { //snapshot is an array of poll documents
                snapshot.forEach(doc => {  // iterate through the array of poll documents
                    var poll = { // create a JSON object for each poll with data the front end can use 
                        type: doc.data().type,
                        role: 'organiser',
                        data: {
                            title: doc.data().poll_name,
                            organiser: doc.data().organiser,
                            ownerId: doc.data().owners[0],
                            winner: doc.data().winner,
                            open: doc.data().open,
                            anon: doc.data().anonymousVoting,
                            voteCode: count
                        }
                    }
                    count = count + 1; // increment count variable
                    userPolls.push(poll);
                })
                db.collection('users/'+auth.currentUser.uid+'/polls/').get()
                .then((snapshot)=>{
                    console.log(snapshot)
                    snapshot.forEach(doc => {
                        console.log(doc)
                        db.doc('polls/'+doc.id).get()
                        .then((pollDoc)=>{
                            var poll = {
                            type: pollDoc.data().type,
                            role: 'participant',
                            data: {
                                title: pollDoc.data().poll_name,
                                organiser: pollDoc.data().organiser,
                                ownerId: pollDoc.data().owners[0],
                                winner: pollDoc.data().winner,
                                open: pollDoc.data().open,
                                anon: pollDoc.data().anonymousVoting,
                                voteCode: count
                                }
                            }
                            count = count + 1; // increment count variable
                            userPolls.push(poll);
                            
                        })
                        .catch(() => {
                            reject(false);
                        })
                        

                    })

                })
                .catch(error => {
                    console.log(error);
                    reject(false)
                            })
            }).catch((error) => { //error in retrieving data from Firestore
                reject(false)
            })
        resolve(userPolls); // resolve the userPolls array
    })
}


export function getPoll(pollID) { // takes in an ID as a parameter and returns the poll associated with that pollID
    return new Promise((resolve, reject) => {
        var returnValue = { // JSON object with 2 fields 
            poll: null, // poll field to store the poll document
            options: null // options field that will store an array 
        }
        db.doc('polls/' + pollID).get() // get the poll document associated with the pollID input
            .then((poll) => {
                returnValue.poll = poll // set the poll field in the returnValue JSON object to the poll document
            })
            .catch(error => { // error will be caught if no document exists
                reject(error) // reject and return the error object 
            })
        db.collection('polls/' + pollID + '/options').get() // get the options associated with the pollID
            .then((snapshot) => { // snapshot will have an array of object documents  
                var optionArray = [] // create an empty array to store the options
                snapshot.forEach(option => { // iterate through the options in snapshot 
                    optionArray.push(option); // add the option to the optionArray
                })
                returnValue.options = optionArray; // set the options field to optionArray
                resolve(returnValue); // resolve the returnValue JSON object
            })
            .catch(error => {
                reject(error)
            })
    })
}

export function vote(optionName, pollId) { // inputs are the name of the option and the pollId 
    return new Promise((resolve, reject) => {
        db.doc('polls/' + pollId).get() // get the poll document from Firestore
            .then((pollDoc) => {
                var anonVoting = pollDoc.data().anonymousVoting // set anonVoting to the value of the anonymousVoting field 
                db.collection('polls/' + pollId + '/options/').where('option_name', '==', optionName).get() // get the option document corresponding to the inputted pollId and optionName
                    .then((querySnapshot) => { 
                        let option = querySnapshot.docs[0] //pollIds are unique so a querySNapshot will never have more than one document for the above query
                        if (anonVoting === false && auth.currentUser === null) { // if anonymous voting is not allowed and user isn't logged in
                            reject("Not verified") // reject because user is not logged in or verified
                        } else if (pollDoc.data().open === false) { // checks if the election is closed
                            reject("Poll closed") // if election is closed reject as voting is not allowed
                        } else if (anonVoting === true) { // if anonymous voting is allowed 
                            var optionToInc = db.doc('/polls/' + pollDoc.id + '/options/' + option.id) // get the option the user is trying to vote for
                            optionToInc.update({
                                votes: firebase.firestore.FieldValue.increment(1) // increment the votes field by 1 
                            }).then(()=>{
                                calculateWinner(pollDoc) // call the calculate winner function to update the winner field in the pollDoc
                                resolve("New vote registered") // resolve with message signifying completion

                            })
                            
                        } 
                        else { // else anonymous voting is not allowed and the user is logged in
                            db.collection('users/' + auth.currentUser.uid + '/polls/').get() // query to get the collection of polls that a user has voted in       
                            .then((querySnapshot) => {
                                var hasUserVotedBefore = false // boolean to check if the user has voted before in this poll
                                querySnapshot.forEach((pollVote) => { //iterate through the array the polls
                                    // since anonymous voting is not allowed we must first check if the user has already voted in the election
                                    if (pollVote.id === pollDoc.id && pollVote.data().option === option.id) { // if pollVote is the same as the poll the user is trying to vote on now 
                                        //and the option they are trying to vote for is the same
                                        hasUserVotedBefore = true // user has already voted in this option in this poll
                                        reject('Already voted for this option')

                                    } else if (pollVote.id === pollDoc.id && pollVote.data().option !== option.id) { // else the user has voted in the poll before but for a different option
                                        hasUserVotedBefore = true // set has user voted before to true
                                        db.collection('users/' + auth.currentUser.uid + '/polls/').doc(pollDoc.id).set({ // query with path to the document for this poll in the current users polls collection 
                                            // set the option field to the id of the new option they have voted for
                                            option: option.id
                                        })
                                        .then(() => { 
                                            var optionToInc = db.doc('/polls/' + pollDoc.id + '/options/' + option.id) // query with the path to the option the user is voting for 
                                            optionToInc.update({ 
                                            votes: firebase.firestore.FieldValue.increment(1) // increment the votes field for the option being voted for
                                            })
                                            .then(()=>{
                                                    var optionToDec = db.doc('/polls/' + pollDoc.id + '/options/' + pollVote.data().option) // query to the path of the option the user previsouly voted for
                                                    optionToDec.update({ 
                                                    votes: firebase.firestore.FieldValue.increment(-1) // decrement the votes for the option previously vote
                                                    }).
                                                    then(()=>{
                                                        calculateWinner(pollDoc)
                                                        resolve("New vote registered") // resolve with a message signifying voting is completed
                                                    })
                                            })
                                        })
                                    }
                                })
                                if (hasUserVotedBefore === false) { // if user hasn't voted in this poll before 
                                    db.collection('users/' + auth.currentUser.uid + '/polls/').doc(pollDoc.id).set({  // query with the path to the option the user is voting for
                                        option: option.id // set the option field to the id of the new option they have voted for
                                    })
                                    var optionToInc = db.doc('/polls/' + pollDoc.id + '/options/' + option.id) // query with the path to the option the user is voting for 
                                    optionToInc.update({
                                        votes: firebase.firestore.FieldValue.increment(1) // increment the votes field for the option being voted for
                                    }).then(()=>{
                                        calculateWinner(pollDoc)
                                        resolve("New vote registered") // resolve with a message signifying voting is completed
        
                                    })
                                    
                                }
                            })
                    }
                    })
            })
    })
}

export function calculateWinner(poll) { // input is a poll document
    var isTie; // boolean to denote when 2 options in the lead are drawing
    var maxVotes = 0; // set max votes to 0 
    var winner; // to track the current winner
    var newWinner = false
    db.collection('/polls/' + poll.id + '/options/').get() // query with path to collection of objects that a poll document has 
        .then((options) => { // options has an attribute docs which is an array of option
            options.docs.forEach(option => {
                if (option.data().votes>maxVotes) { // if option votes is greater than maxVotes 
                    maxVotes = option.data().votes; // set maxVotes to the value of the current options votes 
                    winner = option.data().option_name; // set winner to the current option
                    isTie = false; // set isTie to false
                    newWinner = true; // set newWinner to true 
                }
                else if (option.data().votes === maxVotes && maxVotes !==0) { // if the current options votes is the same as the maxVotes value and maxValues is not 0
                    isTie = true; // set isTie to true
                    newWinner = false; // set newWinner to false
                }
            })
            if (newWinner) { // if newWinner is true
                db.doc('polls/' + poll.id).update({ // query with path to the poll
                    winner: winner // update the winner field with the name of the new winner 
                });
            }
            else if (isTie) { // if isTie is true
                db.doc('polls/' + poll.id).update({ // query with path to the poll
                    winner: "Draw" // update winner to "Draw" to denote that there is no outright leader
                });

            }
        })

}
export function changeOpen(pollID, newOpenValue ) { // takes in a poll document as an input
    return new Promise((resolve, reject) => {
        db.doc('/polls/' + pollID).get() // query with path to the poll
            .then((queryPoll) => {
                console.log(queryPoll.data())
                if (queryPoll.data().owners.includes(auth.currentUser.uid)) { // if the current user is the owner of the poll
                    db.doc('/polls/' + pollID).update({ // query with path to the poll
                        open: newOpenValue // set the value of the open field to false
                    })
                    .then(resolve())
                } else {
                    console.log("you lack privelege to do this");
                }
            })
            .catch(error => reject(error))

    })
}


export function createPollLink(ownerId, pollName) {
    let base = '/vote/'
    base = base.concat(ownerId)
    base = base.concat(pollName)
    return base
}

export function hasUserAlreadyVoted(pollId) { // takes in a pollId as an input 
    return new Promise((resolve, reject) => {
        db.collection('users/' + auth.currentUser.uid + '/polls/').get() // query with path to the poll is the currentUsers collection of polls
            .then((querySnapshot) => { // querySnapshot has a docs attributes with an array of poll documents
                querySnapshot.forEach((pollVote) => { // iterate through the array of poll documents
                    if (pollVote.id === pollId) { // if input(pollId) is in the array
                        resolve(pollVote.data().option) // resolve the option that the user voted for 
                    }
                })
                resolve(false) // else reslove false denoting the user hasn't voted before
            })
            .catch(error => {
                console.log("ERROR FINDING VOTE")
                console.log(error)
                reject(error)
            })
    })
}

export function deletePoll(pollId)  {
    return new Promise((resolve, reject) => {
    db.doc('/polls/' + pollId).get() // query with path to the poll
    .then((queryPoll) => {
        if (queryPoll.data().owners.includes(auth.currentUser.uid)) { // if the current user is the owner of the poll
            db.doc('/polls/' + pollId).delete() // query with path to the poll and deleting it
            .then(()=> {
                console.log('file deleted')
            })
            db.collection('/polls/'+pollId+'/options/').get()
            .then((snapshot)=>{
                snapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
            resolve(true)
        } else {
            reject("you lack privelege to do this");
        }
    })
    })
}