import React from 'react'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react/cjs/react.development'
import { getUserByUid } from '../../../firebaseFunctions/auth'
import { getPoll, hasUserAlreadyVoted, vote, changeOpen } from '../../../firebaseFunctions/polls'
import "./vote.css"
import "./activePanel.js"
import { useUser } from '../../../context/UserContext'

function Vote() {

    const user = useUser()
    const { pollId } = useParams()

    const getCurrentPoll = () => {
        getPoll(pollId)
        .then(newPoll => {
            getUserByUid(newPoll.poll.data().owners[0])
            .then(userObj => {
                setCurrentPoll({
                    options: newPoll.options.map(option => { 
                        return { 
                            caption: option.data().option_name
                        }
                    }),
                    anon: newPoll.poll.data().anonymousVoters,
                    createdDate: newPoll.poll.data().createdAt,
                    desc: newPoll.poll.data().description,
                    open: newPoll.poll.data().open,
                    organiser: userObj,
                    owners: newPoll.poll.data().owners,
                    title: newPoll.poll.data().poll_name,
                    type: newPoll.poll.data().type,
                    winner: newPoll.poll.data().winner
                })
                if (newPoll.poll.data().open) {
                    // determine if user has already voted in this poll and what they voted on
                    user !== null && hasUserAlreadyVoted(`${newPoll.poll.data().owners[0]}${newPoll.poll.data().poll_name}`)
                    .then(result => {
                        if (result !== false) {
                            let voteIndex = parseInt(result.replace("option",""))
                            setAlreadyVoted({
                                caption: newPoll.options[voteIndex].data().option_name
                            })
                            // setVoteConfirmed({
                            //     caption: newPoll.options[voteIndex].data().option_name
                            // })
                            setVoteMsg(`It looks like you've already voted for: ${newPoll.options[voteIndex].data().option_name}`)
                        } else {
                            setVoteMsg(`You haven't voted on this poll yet. Choose an option and hit the "Confirm Vote" button!`)
                        }
                    })
                    .catch(error => {
                        console.log("ERROR CHECKING IF ALREADY VOTED")
                        console.log(error)
                    })
                } else {
                    setVoteMsg("This poll has been closed by its organiser and is no longer accepting votes")
                }
                setFindingPoll(false)
            })
        })
        .catch(error => {
            console.log(error)
            setFindingPoll(false)
            setPollError(true)
        })
    }
    const [ findingPoll, setFindingPoll ] = useState(true)
    const [ pollError, setPollError ] = useState(false)
    const [ currentPoll, setCurrentPoll ] = useState(null)
    const [ selectedOption, setSelectedOption ] = useState(null)
    const [ voteConfirmed, setVoteConfirmed ] = useState({ status: false })
    const [ voteMsg, setVoteMsg ] = useState("")
    const [ alreadyVoted, setAlreadyVoted ] = useState(false)
    const [ forceUpdateCurrentPoll, setForceUpdateCurrentPoll ] = useState(false)

    const voteForOption = option => {
        if (option === selectedOption) {
            setVoteMsg(`Option "${option.caption}" is already selected`)
        } else {
            setVoteMsg(`Voting for: ${option.caption}`)
            setSelectedOption(option)
        }
    }

    const confirmVote = () => {
        if (selectedOption) {
            setVoteMsg("Confirming your vote")
            vote(selectedOption.caption, (currentPoll.owners[0].concat(currentPoll.title)))
            .then(response => {
                console.log(`Vote response: ${response}`)
                setVoteConfirmed({
                    status: true,
                    option: selectedOption
                })
                setVoteMsg(`Your vote has been confirmed! You voted for: ${selectedOption.caption}`)
            })
            .catch(error => {
                console.log(error)
                switch (error) {
                    case "Not verified":
                        setVoteMsg("This poll only lets verified users vote. Please make sure you're logged in and have verified your email")
                        break
                    case "Poll closed":
                        setVoteMsg("Sorry it seems this vote has closed and is no longer accepting votes")
                        break
                    case "Already voted for this option":
                        setVoteMsg("It looks like you already voted for this option, please choose another option")
                        break
                    default:
                        setVoteMsg("Confirmation error")
                }
            })
        } else {
            setVoteMsg("Please click the option you would like to vote for before confirming!")
        }
    }

    const changePollStatus = (status) => {
        if ((currentPoll.open && status) || !(currentPoll.open && status) ) {
            if (currentPoll.owners.includes(user.uid)) {
                changeOpen(`${currentPoll.owners[0]}${currentPoll.title}`, status)
                .then(() => {
                    setForceUpdateCurrentPoll(!forceUpdateCurrentPoll)
                })
                .catch(error => {
                    console.log(error)
                })
            } else {
                setVoteMsg(`You don't have permission to ${status ? "open" : "close"} this vote`)
            }
        } else {
            setVoteMsg(`This vote is already ${status ? "open" : "closed"}`)
        } 
    }

    useEffect(() => {
        getCurrentPoll()
    }, [ user, forceUpdateCurrentPoll ])

    if (findingPoll) {
        return <h1> Please wait while we find the vote you're looking for... </h1>
    }
    else if (pollError){
        return <h1> There was an error while finding the poll you're looking for. Please refresh and try again </h1>
    }
    else {
        return (
            <div className="voteContainer">
            <div className="voteSections">
                <h3> {currentPoll.title} {!currentPoll.open ? "(Closed)" : ""} </h3>
                <h4> {currentPoll.open ? "Current" : ""} Winner: {currentPoll.winner} </h4>
                <p className="voteMsg"> {voteMsg} </p>
                { voteConfirmed.status === false &&
                    <div>
                        <div className="optionList">
                            {currentPoll.options.map((option, index) => {
                                return (
                                    <div className="voteOption" key={index} onClick={() => voteForOption(option, currentPoll.options.indexOf(option))}>
                                        <p className="optionCaption"> {option.caption} </p>
                                        <p className="optionNumber"> {currentPoll.options.indexOf(option)} </p>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="castVote">
                            { currentPoll.owners.includes(user.uid) && currentPoll.open && <button onClick={() => changePollStatus(false)}> Close Vote </button>}
                            { currentPoll.owners.includes(user.uid) && !currentPoll.open && <button onClick={() => changePollStatus(true)}> Re-Open Vote </button>}
                            { user !== null && currentPoll.open && <button onClick={() => confirmVote()}> { alreadyVoted ? "Change Vote" : "Confirm Vote"} </button> }
                        </div>
                    </div>
                }

                <div className="pollInfo">
                    <h3> Vote Information</h3>
                    <div className="organiser">
                        <p className="organiserName">Organiser: {currentPoll.organiser.fname} {currentPoll.organiser.sname} </p>
                        <p className="organiserEmail">Contact Email: {currentPoll.organiser.email} </p>
                        <div className="organiserSocials">
                            {/* <p className="organiserTwitter"> {currentPoll.organiser} </p> */}
                            {/* <p className="organiserGitHub"> {currentPoll.organiser} </p> */}
                            {/* <p className="organiserLinkedIn"> {currentPoll.organiser} </p> */}
                        </div>
                        <div className="pollDesc">
                            <p> {currentPoll.desc} </p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
export default Vote
