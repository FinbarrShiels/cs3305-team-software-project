import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { useState } from 'react/cjs/react.development'
import { useUser } from '../../../context/UserContext'
import { getUserByUid } from '../../../firebaseFunctions/auth'
import { getPoll } from '../../../firebaseFunctions/polls'
import "./vote.css"
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
                setFindingPoll(false)
            })
        })
        .catch(error => {
            console.log(error)
            setFindingPoll(false)
            setGetPollError(true)
        })
    }
    const [ findingPoll, setFindingPoll ] = useState(true)
    const [ getPollError, setGetPollError ] = useState(false)
    const [ currentPoll, setCurrentPoll ] = useState(() => getCurrentPoll())
    const [ selectedOption, setSelectedOption ] = useState(null)
    const [ voteConfirmed, setVoteConfirmed ] = useState({ status: false })
    const [ voteMsg, setVoteMsg ] = useState("")

    const voteForOption = option => {
        console.log(`Voting for: ${option.caption}`)
        setSelectedOption(option)
    }

    const confirmVote = () => {
        selectedOption !== null ?
        setVoteConfirmed({
            status: true,
            option: selectedOption
        })
        :
        setVoteMsg("Please click the option you would like to vote for before confirming!")
    }

    if (findingPoll) {
        return <h1> Please wait while we find the vote you're looking for... </h1>
    }
    else if (getPollError){
        return <h1> There was an error while finding the poll you're looking for. Please refresh and try again </h1>
    }
    else {
        return (
            <div className="voteContainer">
                <h3> {currentPoll.title} </h3>
                <p className="voteMsg"> {voteMsg} </p>
                { !voteConfirmed.status
                ? 
                    <div className="optionList">
                        {currentPoll.options.map((option, index) => {
                            return (
                                <div className="voteOption" key={index} onClick={() => voteForOption(option, currentPoll.options.indexOf(option))}>
                                    <p className="optionCaption"> {option.caption} </p>
                                    <p className="optionNumber"> {currentPoll.options.indexOf(option)} </p>
                                </div>
                            )
                        })}
                        <button onClick={() => confirmVote()}> Confirm Vote </button>
                    </div>
                :
                    <p className="alreadyVoted"> Your vote has been confirmed! You voted for: {voteConfirmed.option.caption} </p>
                }
                <div className="pollInfo">
                    <div className="organiser">
                        <p className="organiserName"> {currentPoll.organiser.fname} {currentPoll.organiser.sname} </p>
                        <p className="organiserEmail"> {currentPoll.organiser.email} </p>
                        <div className="organiserSocials">
                            {/* <p className="organiserTwitter"> {currentPoll.organiser} </p> */}
                            {/* <p className="organiserGitHub"> {currentPoll.organiser} </p> */}
                            {/* <p className="organiserLinkedIn"> {currentPoll.organiser} </p> */}
                        </div>
                    </div>
                    <div className="pollDesc">
                        <p> {currentPoll.desc} </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default Vote
