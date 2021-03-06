import React from 'react';
import "./Organise.css";
import clipboard from "../../Images/clipboard.png";
import { useState } from "react";
import Switch from "react-switch";
import { useInput } from "../../../customHooks/form-input"

function Organise() {

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
            <div className="voteSections">
            <div className="leftTab">
                <h2>Organise your <span>poll</span></h2>
                <img src={clipboard} alt="img"/>
            </div>
            <div className="rightTab">
                <form className="voteOptions" onSubmit={createVote}>
                    <div className="title">
                    <label>Title:</label>
                        <input type="text" {...bindTitle}/>
                    </div>
                    <div className="desc" >
                        <label>Description:</label>
                        <input type="text" {...bindDesc}/>
                    </div>
                    <div className="anonToggle" >
                    <label>Allow Anonymous Voters:</label>
                        <Switch checked={anonChecked} onChange={setAnonChecked}/>
                    </div>
                    <div className="scheduleStart">
                    <label >Start:</label>
                        <input type="date" {...bindStartDate}/>
                        <input type="time" {...bindStartTime}/>
                    </div>
                    <div className="scheduleEnd">
                    <label>End:</label>
                        <input type="date" {...bindEndDate}/>
                        <input type="time" {...bindEndTime}/>
                    </div>
                    <div className="createVote">
                    <input type="submit" value="Create"/>
                    </div>
                </form>
            </div>
            </div>
        </div>
    )
}
export default Organise;