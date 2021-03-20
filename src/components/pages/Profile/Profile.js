import React, { useEffect, useState } from 'react'
import "./profile.css"
import avatar from '../../Images/avatar.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Elections from "./VotesTab"
import Invites from "./Invites"
import Bio from "./BioTab"
import "./activeButton.js"
import { useUser } from '../../../context/UserContext'
import { pollsForUser } from '../../../firebaseFunctions/polls'
import { getBio, setBio } from '../../../firebaseFunctions/profile'
import {sendVerifyEmail} from "../../../firebaseFunctions/custom-landing";

function Profile() {
    
    const user = useUser()
    const getUserElections = () => {
        if (user) {
            pollsForUser()
            .then(userPolls => {
                setElectionMsg("")
                setSavedElections(userPolls)
            })
            .catch(error => {
                setElectionMsg("Something went wrong when getting your elections. Try reloading the page.")
                console.log('Failed GET')
                console.log(error)
            })
        }
        else {
            setElectionMsg("Please wait while we fetch your voting data...")
        }
    }
    const getCurrentBio = () => {
        if (user) {
            getBio()
        .then(currentBio => {
            setBioMsg("")
            setSavedBio(currentBio)
        })
        .catch(error => {
            setBioMsg("We couldn't retrieve your bio. Try reloading the page and try again.")
        })
        }
        else {
            setBioMsg("Please wait while we fetch your bio...")
        }
    }
    const saveNewBio = newBio => {
        setSavedBio(newBio)
        setBio(newBio)
    }

    useEffect(() => {
        getUserElections()
        getCurrentBio()
    }, [ user ])

    const [ savedElections, setSavedElections ] = useState(null)
    const [ savedBio, setSavedBio ] = useState('')
    const [ electionMsg, setElectionMsg ] = useState('')
    const [ bioMsg, setBioMsg ] = useState('')
    const [ inviteMsg, setInviteMsg ] = useState('')
    const [ tab, setTab ] = useState(1)
    const currentTab = tab => {
        switch(tab) {
            case 1:
                return <Invites currentInvite={null} message={inviteMsg}/>
            case 2:
                return <Elections currentElections={savedElections} message={electionMsg}/>
            case 3:
                return <Bio currentBio={savedBio} saveBio={saveNewBio} message={bioMsg}/>
            default:
                return <h3> Sorry, something went wrong while changing tabs. Please refresh the page and try again. </h3>
        }
    }

    return(
        user !== null ? (
            <div className="profileContainer">
                <div className="profileCard">
                    <div className="left">
                        <div className="profileAvatar">
                            <img className="avatarImage" src={avatar} alt="avatar"/>
                            {user.verified ? 
                                <svg width="10mm" height="10mm" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(-55,-98.5)">
                                        <path fill="#0f0" transform="matrix(.26458 0 0 .26458 55 98.5)" d="m188.98 0a188.98 188.98 0 0 0-188.98 188.98 188.98 188.98 0 0 0 188.98 188.98 188.98 188.98 0 0 0 188.98-188.98 188.98 188.98 0 0 0-188.98-188.98zm88.508 86.691 37.906 37.904-166.67 166.67-86.16-85.869 37.881-37.881 48.109 48.109z"/>
                                    </g>
                                </svg>
                            : 
                                <svg width="10mm" height="10mm" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="translate(-55,-98.5)">
                                    <path  fill="#f00" transform="matrix(.26458 0 0 .26458 55 98.5)" d="m188.98 0a188.98 188.98 0 0 0-188.98 188.98 188.98 188.98 0 0 0 188.98 188.98 188.98 188.98 0 0 0 188.98-188.98 188.98 188.98 0 0 0-188.98-188.98zm-57.963 103.45 57.963 58.305 57.963-58.305 27.223 27.062-58.123 58.465 58.121 58.465-27.221 27.062-57.963-58.305-57.963 58.305-27.223-27.062 58.123-58.465-58.123-58.465z"/>
                                    </g>
                                </svg>
                             }
                        </div>
                        <p className="profileName"> {user.fname !== undefined && user.sname !== undefined && `${user.fname} ${user.sname}`} </p>
                        <p className="profileEmail"> {user.email} </p>
                        {/* <p className="profileOccupation"> Occupation </p>
                        <p className="profileLocation"> Location </p> */}
                        <div className="profileConnectedAccounts">
                            <FontAwesomeIcon className="twitter" icon={['fab', 'twitter']}/>
                            <FontAwesomeIcon className="linkedIn" icon={['fab', 'linkedin']}/>
                            <FontAwesomeIcon className="git" icon={['fab', 'github']}/>
                        </div>
                        <button className="profileSettings"> Profile Settings </button>
                        { user !== null && !user.verified && <button className="verifyEmail" onClick={sendVerifyEmail}> Verify email </button>}
                    </div>
                    <div className="right">
                        <div className="tabOptions">
                            <div className="buttonContainer">
                                <button className="buttonInvites" onClick={() => {setTab(1)}}> Invites </button>
                                <button className="buttonElection" onClick={() => {setTab(2)}}> Votes </button>
                                <button className="buttonBio" onClick={() => {setTab(3)}}> Bio </button>
                            </div>
                        </div>
                        {currentTab(tab)}
                    </div>
                </div>
            </div>
        )
        :
        (
            <h1 className="forceLogInMessage"> YOU MUST LOG IN FIRST </h1>
        )
    )
}
export default Profile;