import { Link } from "react-router-dom"
import { createPollLink } from "../../../firebaseFunctions/polls"
import "./votestab.css"
import { useHistory } from 'react-router-dom'

function Elections(props) {

    const history = useHistory()

    return (
        <div className="electionsTab">
            <span className="tabMessage"> {props.message} </span>
            <h3 className="tabHeading"> Your Votes </h3>
            {props.currentElections && props.currentElections.length !== 0
            ?
            <div className="electionList">
                <table>
                    <thead>
                        <tr>
                            <th> Type </th>
                            <th> Title </th>
                            <th> Winner </th>
                            <th> Status </th>
                            {/* <th> Start Date </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {props.currentElections.map(election => {
                            return (
                                <tr className="electionItem" key={election.data.voteCode}>
                                    <td className="type"> {election.type} </td>
                                    <td className="title"> {election.data.title} </td>
                                    <td className="winner"> {election.data.winner} </td>
                                    <td className="status"> {election.data.open ? "Open" : "Closed"} </td>
                                    {/* Should include start date of the poll */}
                                    <td><button className="viewVoteButton" onClick={() => history.push(createPollLink(election.data.ownerId, election.data.title))}> View Vote </button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            :
            <div className="electionsNotFound">
                <h3> It doesn't look like you've organised any votes. <Link to="/organise"> Try it here! </Link> </h3>
            </div>
            }
        </div>
    )
}
export default Elections