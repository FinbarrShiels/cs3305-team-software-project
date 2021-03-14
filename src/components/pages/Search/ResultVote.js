import "./ResultsVote.css"
import graph from '../../Images/chart.png'
import { useHistory } from 'react-router-dom'
import { createPollLink } from "../../../firebaseFunctions/polls"

function ResultVote(props) {

    const history = useHistory()

    return (
        <div className="resultsVoteContainer">
            <div className="info">
                <h5> {props.result.title} </h5>
                <p> Organiser: {props.result.organiser} </p>
                <p> Winner: {props.result.winner} </p>
                <button onClick={() => history.push(createPollLink(props.result.ownerId, props.result.title))}>View Vote</button>
            </div>
            <div className="graph">
                <img src={graph} alt="graph" />
            </div>
        </div>
    )
}
export default ResultVote
