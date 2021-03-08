import React, { useEffect } from 'react'
import queryString from 'query-string'
import { useParams } from 'react-router'
import { useState } from 'react/cjs/react.development'
import { useUser } from '../../../context/UserContext'
import { getPoll } from '../../../firebaseFunctions/polls'

function Vote() {

    const user = useUser()
    const { pollId } = useParams()

    const getCurrentPoll = () => {
        getPoll(pollId)
        .then(newPoll => {
            setCurrentPoll({
                options: newPoll.options.map(option => {
                    return { caption: option.data().option_name }
                 }),
                 anon: newPoll.poll.data().anonymousVoters,
                 createdDate: newPoll.poll.data().createdAt,
                 desc: newPoll.poll.data().description,
                 open: newPoll.poll.data().open,
                 organiser: newPoll.poll.data().organiser,
                 owners: newPoll.poll.data().owners,
                 title: newPoll.poll.data().poll_name,
                 type: newPoll.poll.data().type,
                 winner: newPoll.poll.data().winner
             })
            setFindingPoll(false)
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

    if (findingPoll) {
        return <h1> Please wait while we find the vote you're looking for... </h1>
    }
    else if (getPollError){
        return <h1> There was an error while finding the poll you're looking for. Please refresh and try again </h1>
    }
    else {
        return <div className="voteContainer">
                <h3> {currentPoll.title} </h3>
                <div className="optionList">
                    {/* {currentPoll.options.map(option => {
                        return (
                            <div className="voteOption">
                                <p className="optionCaption"> {option} </p>
                            </div>
                        )
                    })} */}
                </div>
                <div className="pollInfo">
                    <div className="organiser">
                        <p className="organiserName"> {currentPoll.organiser} </p>
                        <p className="organiserEmail"> {currentPoll.organiser} </p>
                        <p className="organiserUsername"> {currentPoll.organiser} </p>
                        <div className="organiserSocials">
                            <p className="organiserTwitter"> {currentPoll.organiser} </p>
                            <p className="organiserGitHub"> {currentPoll.organiser} </p>
                            <p className="organiserLinkedIn"> {currentPoll.organiser} </p>
                        </div>
                    </div>
                    <div className="pollDesc">
                        <p> {currentPoll.desc} </p>
                    </div>
                </div>
            </div>
    }
}
export default Vote
