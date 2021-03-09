import { Link } from "react-router-dom"
import "./elections.css"
function Elections(props) {
    return (
        <div className="electionsTab">
            <span className="tabMessage"> {props.message} </span>
            <h3 className="tabHeading"> Your Elections </h3>
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
                                    <td className="title">{election.data.title} </td>
                                    <td className="winner"> {election.data.winner} </td>
                                    <td className="status"> {election.data.open ? "Open" : "Closed"} </td>
                                    {/* Should include start date of the poll */}
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