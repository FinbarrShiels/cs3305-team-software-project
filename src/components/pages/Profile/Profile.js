import React, { useEffect, useState } from 'react'
import "./profile.css"
import avatar from '../../Images/avatar.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Elections from "./Elections"
import Invites from "./Invites"
import Bio from "./Bio"
import "./activeButton"
import { useUser } from '../../../context/UserContext'
import { pollsForUser } from '../../../firebaseFunctions/polls'
import { getBio, setBio } from '../../../firebaseFunctions/profile'

function Profile() {
    
    const user = useUser()
    const getUserElections = () => {
        pollsForUser()
        .then(userPolls => {
            setSavedElections(userPolls)
        })
        .catch(error => {
            setElectionMsg("Something went wrong when getting your elections. Try reloading the page.")
            console.log('Failed GET')
            console.log(error)
        })
    }
    const getCurrentBio = () => {
        getBio()
        .then(currentBio => {
            setSavedBio(currentBio)
        })
        .catch(error => {
            setBioMsg("We couldn't retrieve your bio. Try reloading the page and try again.")
        })
    }
    const saveNewBio = newBio => {
        setSavedBio(newBio)
        setBio(newBio)
    }
    const [ savedElections, setSavedElections ] = useState(() => getUserElections())
    const [ savedBio, setSavedBio ] = useState(() => getCurrentBio())
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
                            {/* <img className="verifiedBadge" src={} alt="user verification badge"/> */}
                        </div>
                        <p> {user.verified ? "Verified" : "Not Verified"} </p>
                        <p className="profileName"> {`${user.fname} ${user.sname}`} </p>
                        <p className="profileEmail"> {user.email} </p>
                        {/* <p className="profileOccupation"> Occupation </p>
                        <p className="profileLocation"> Location </p> */}
                        <div className="profileConnectedAccounts">
                            <FontAwesomeIcon className="twitter" icon={['fab', 'twitter']}/>
                            <FontAwesomeIcon className="linkedIn" icon={['fab', 'linkedin']}/>
                            <FontAwesomeIcon className="git" icon={['fab', 'github']}/>
                        </div>
                        <button className="profileSettings"> Profile Settings </button>
                    </div>
                    <div className="right">
                        <div className="tabOptions">
                            <div className="buttonContainer">
                                <button className="button" onClick={() => {setTab(1)}}> Invites </button>
                                <button className="button" onClick={() => {setTab(2)}}> Elections </button>
                                <button className="button" onClick={() => {setTab(3)}}> Bio </button>
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