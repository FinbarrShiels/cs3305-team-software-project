import { useState } from "react";
import Switch from "react-switch";

function OrganiseVote() {
    const [ anonChecked, setAnonChecked ] = useState(false);

    return (
        <div className="organiseVote">
            <div className="left">
                <h2>Organise your poll</h2>
                
            </div>
            <div className="right">
                <form className="voteOptions">
                    <label className="title">
                        Title:
                        <input type="text"/>
                    </label>
                    <label className="desc">
                        Description:
                        <textarea/>
                    </label>
                    <label className="anonToggle">
                        Allow Anonymous Voters:
                        <Switch checked={anonChecked} onChange={setAnonChecked}/>
                    </label>
                    <label className="scheduleStart">
                        Start:
                        <input type="date"/>
                        <input type="time"/>
                    </label>
                    <label className="scheduleEnd">
                        End:
                        <input type="date"/>
                        <input type="time"/>
                    </label>
                    <div className="invite">
                        <button>Invite</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default OrganiseVote
