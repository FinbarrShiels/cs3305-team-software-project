import React, { useState } from 'react'
import "./profile.css"
import avatar from '../../Images/avatar.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Elections from "./Elections"
import Invites from "./Invites"
import Bio from "./Bio"
import { useUser } from '../../../context/UserContext'

function currentTab(tab) {
    switch(tab) {
        case 1:
            return <Invites/>
        case 2:
            return <Elections/>
        default:
            return <Bio/>
    }
}

function Profile() {
    const user = useUser();
    const [ tab, setTab ] = useState(1);

    return user !== null ? 
        <div className="profileContainer">
            <div className="profileCard">
                <div className="left">
                    <div className="profileAvatar">
                        <img className="avatarImage" src={avatar} alt="avatar"/>
                    </div>
                    <p className="profileName"> {user.email} </p>
                    <p className="profileOccupation"> Occupation </p>
                    <p className="profileLocation"> Location </p>
                    <div className="profileConnectedAccounts">
                        <div><FontAwesomeIcon icon={['fab', 'twitter']}/> @testTwitterHandle </div>
                        <div><FontAwesomeIcon icon={['fab', 'linkedin']}/> www.linkedin.com/in/testLinkedInUser </div>
                        <div><FontAwesomeIcon icon={['fab', 'github']}/> github.com/testGitHubUser </div>
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
    :
        <h1>YOU NEED TO LOG IN TO VIEW YOUR PROFILE</h1>
}
export default Profile;