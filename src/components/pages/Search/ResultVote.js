import "./ResultsVote.css"
import graph from '../../Images/chart.png'
function ResultVote(props) {
    return (
        <div className="resultsVoteContainer">
            <div className="info">
                <h5>{props.title}</h5>
                <p>Organiser: {props.organiser}</p>
                <p>Winner: {props.winner}</p>
                <button>View Vote</button>
            </div>
            <div className="graph">
                <img src={graph} alt="graph" />
            </div>
        </div>
    )
}
export default ResultVote
