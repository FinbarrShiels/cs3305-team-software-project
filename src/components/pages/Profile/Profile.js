import React, { useState } from 'react';
import "./profile.css"
import avatar from '../../Images/avatar.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
<<<<<<< HEAD
import Elections from "./Elections";
import Invites from "./Invites";
import Bio from "./Bio";

function currentTab(tab) {
    switch(tab) {
        case 1:
            return <Invites/>
        case 2:
            return <Elections/>
        default:
            return <Bio/>
=======
import "./activeButton.js";

function getTab(tab) {
    if (tab === 1) {
        return (
            <div className="bioTab">
                <h2>BIO</h2>
                <button className="editBio"> Edit Bio </button>
            </div>
        )
    }
    else if (tab === 2) {
        return (
            <div className="videosTab">
                <h2>Videos</h2>
            </div>
        )
>>>>>>> f9345b0d0081cd30a512556d680bb7ecb125abd5
    }
}

function Profile() {
    const [ tab, setTab ] = useState(() => {return 1});

    return(
        <div className="profileContainer">
<<<<<<< HEAD
            <div className="left">
                <div className="profileAvatar"><img className="avatarImage" src={avatar} alt="avatar"/>
                </div>
                <p className="profileName"> Name </p>
                <p className="profileOccupation"> Occupation </p>
                <p className="profileLocation"> Location </p>
                <div className="profileConnectedAccounts">
                    <div><FontAwesomeIcon icon={['fab', 'twitter']}/> </div>
                    <div><FontAwesomeIcon icon={['fab', 'linkedin']}/></div>
                    <div><FontAwesomeIcon icon={['fab', 'github']}/></div>
                </div>
                <button className="profileSettings"> Profile Settings </button>
            </div>
            <div className="right">
                <div className="tabOptions">
                    <div className="buttonContainer">
                    <button class="button" onClick={() => {setTab(1)}}> Invites </button>
                    <button class="button" onClick={() => {setTab(2)}}> Elections </button>
                    <button class="button" onClick={() => {setTab(3)}}> Bio </button>
=======
            <div className="profileCard">
                <div className="left">
                    <div className="profileAvatar"><img className="avatarImage" src={avatar} alt="avatar"/>
                    </div>
                    <p className="profileName"> Name </p>
                    <p className="profileOccupation"> Occupation </p>
                    <p className="profileLocation"> Location </p>
                    <div className="profileConnectedAccounts">
                        <div><FontAwesomeIcon icon={['fab', 'twitter']}/> </div>
                        <div><FontAwesomeIcon icon={['fab', 'linkedin']}/></div>
                        <div><FontAwesomeIcon icon={['fab', 'github']}/></div>
                    </div>
                    <button className="profileSettings"> Profile Settings </button>
                </div>
                <div className="right">
                    <div className="tabOptions">
                        <div className="buttonContainer">
                            <li class="buttonBio" onClick={() => {setTab(1)}}> Biography </li>
                            <li class="buttonElection" onClick={() => {setTab(2)}}> Elections </li>
                        </div>
>>>>>>> f9345b0d0081cd30a512556d680bb7ecb125abd5
                    </div>
                    {getTab(tab)}
                </div>
<<<<<<< HEAD
                {currentTab(tab)}
=======
>>>>>>> f9345b0d0081cd30a512556d680bb7ecb125abd5
            </div>
        </div>
    )
}
export default Profile;