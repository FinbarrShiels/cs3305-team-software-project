import React, { useState } from 'react';
import "./profile.css"
import avatar from '../../Images/avatar.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
    }
}

function Profile() {
    const [ tab, setTab ] = useState(() => {return 1});

    return(
        <div className="profileContainer">
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
                    </div>
                    {getTab(tab)}
                </div>
            </div>
        </div>
    )
}
export default Profile;