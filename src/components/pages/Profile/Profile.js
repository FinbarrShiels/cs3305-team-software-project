import React, { useState } from 'react'
import "./profile.css"
import avatar from '../../Images/avatar.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import Elections from "./Elections"
import Invites from "./Invites"
import Bio from "./Bio"
import "./activeButton"
import { useUser } from '../../../context/UserContext'
import { pollsForUser } from '../../../firebaseFunctions/polls'

// const fakeElections = [
//     {
//         type: "poll",
//         data: {
//             anonymousVoting: true,
//             description: "I think it works",
//             open: true,
//             organiser: "Diarmuid Mckenna",
//             owners: [
//                 "bABFYblkaWWYgSJny11ygYkv1oR2"
//             ],
//             poll_name: "Test Poll: 1",
//             winner: "None" 
//         }       
//     },
//     {
//         type: "election",
//         data: {
//             anonymousVoting: true,
//             description: "Yep its working",
//             open: true,
//             organiser: "Luke Tynan",
//             owners: [
//                 "bABFYblkaWWYgSJny11ygYkv1oR2"
//             ],
//             poll_name: "Test Poll: 2",
//             winner: "None"
//         }       
//     },
//     {
//         type: "poll",
//         data: {
//             anonymousVoting: true,
//             description: "Its working alright",
//             open: true,
//             organiser: "Luke Tynan",
//             owners: [
//                 "bABFYblkaWWYgSJny11ygYkv1oR2"
//             ],
//             poll_name: "Test Poll: 3",
//             winner: "None"
//         }       
//     },
//     {
//         type: "poll",
//         data: {
//             anonymousVoting: true,
//             description: "Its definitely working",
//             open: true,
//             organiser: "Luke Tynan",
//             owners: [
//                 "bABFYblkaWWYgSJny11ygYkv1oR2"
//             ],
//             poll_name: "Test Poll: 4",
//             winner: "None"
//         }       
//     },
//     {
//         type: "poll",
//         data: {
//             anonymousVoting: true,
//             description: "Is it working?",
//             open: true,
//             organiser: "Luke Tynan",
//             owners: [
//                 "bABFYblkaWWYgSJny11ygYkv1oR2"
//             ],
//             poll_name: "Test Poll: 5",
//             winner: "None"
//         }       
//     },
//     {
//         type: "election",
//         data: {
//             anonymousVoting: true,
//             description: "i hope",
//             open: true,
//             organiser: "Luke Tynan",
//             owners: [
//                 "bABFYblkaWWYgSJny11ygYkv1oR2"
//             ],
//             poll_name: "Test Poll: 6",
//             winner: "None"
//         }       
//     }
// ]

function Profile() {
    
    const user = useUser()
    const getUserElections = () => {
        pollsForUser()
        .then(userPolls => {
            console.log('Completed GET')
            console.log(userPolls)
            setSavedElections(userPolls)
        })
        .catch(error => {
            console.log('Failed GET')
            console.log(error)
        })
    }
    const [ savedElections, setSavedElections ] = useState(() => getUserElections())
    const [ savedBio, setSavedBio ] = useState('')
    const [ tab, setTab ] = useState(() => {return 1});
    const currentTab = tab => {
        switch(tab) {
            case 1:
                return <Invites/>
            case 2:
                return <Elections currentElections={savedElections}/>
            case 3:
                return <Bio currentBio={savedBio} saveBio={setSavedBio}/>
            default:
                return <div>TAB ERROR</div>
        }
    }

    return(
        user !== null ? (
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
            <h1> YOU MUST LOG IN FIRST </h1>
        )
    )
}
export default Profile;