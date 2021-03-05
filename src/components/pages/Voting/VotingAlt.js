import React from 'react';
import "./Voting.css";
import clipboard from "../../Images/clipboard.png";
import { useState } from "react";
import Switch from "react-switch";
import { useInput } from "../../../customHooks/form-input"

function VotingAlt() {

    const { value:title, bind:bindTitle, reset:resetTitle } = useInput("");
    const { value:desc, bind:bindDesc, reset:resetDesc } = useInput("");
    const { value:startTime, bind:bindStartTime, reset:resetStartTime } = useInput("");
    const { value:startDate, bind:bindStartDate, reset:resetStartDate } = useInput("");
    const { value:endTime, bind:bindEndTime, reset:resetEndTime } = useInput("");
    const { value:endDate, bind:bindEndDate, reset:resetEndDate } = useInput("");
    const [ anonChecked, setAnonChecked ] = useState(false);

    const createVote = (e) => {
        e.preventDefault();
        console.log("Creating vote with the following options:")
    }

    return (

        <div className="votingContainer">
            <div className="leftTab">
                <h2>Organise your <span>poll</span></h2>
                <h4>Vote Code: <span className="voteCode">#SAMPLE</span></h4>
                {title}<br/>
                {desc}<br/>
                {anonChecked ? "Y" : "N"}<br/>
                {startDate}<br/>
                {startTime}<br/>
                {endDate}<br/>
                {endTime}
                <img src={clipboard} alt="img"/>
            </div>
            <div className="rightTab">
                <form className="voteOptions" onSubmit={createVote}>
                    <label className="title">
                        Title:
                        <input type="text" {...bindTitle}/>
                    </label>
                    <label className="desc">
                        Description:
                        <textarea {...bindDesc}/>
                    </label>
                    <label className="anonToggle">
                        Allow Anonymous Voters:
                        <Switch checked={anonChecked} onChange={setAnonChecked}/>
                    </label>
                    <label className="scheduleStart">
                        Start:
                        <input type="date" {...bindStartDate}/>
                        <input type="time" {...bindStartTime}/>
                    </label>
                    <label className="scheduleEnd">
                        End:
                        <input type="date" {...bindEndDate}/>
                        <input type="time" {...bindEndTime}/>
                    </label>
                    <input type="submit" className="createVote" value="Create"/>
                </form>
            </div>
        </div>
    )
}
export default VotingAlt;