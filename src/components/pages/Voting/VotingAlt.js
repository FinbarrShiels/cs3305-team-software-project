import React from 'react';
import "./Voting.css";
import clipboard from "../../Images/clipboard.png";
function VotingAlt() {

    return (

        <div className="votingContainer">
            <div className="tabContainer">
                <div className="organiser">
                    <h5>Organiser</h5>
                    <p>Set up poll</p>

                </div>
                <div className="candidate">
                    <h5>Candidate</h5>
                    <p>Apply for position</p>
                </div>
                <div className="voter">
                    <h5>Voter</h5>
                    <p>Cast your Vote</p>
                </div>
            </div>
            <div className="informationContainer">
                <div className="activeSelector">
                    <h2>Organise your <span>poll</span></h2>
                    <img src={clipboard} alt="img"/>
                </div>
            </div>
        </div>
    )
}
export default VotingAlt;