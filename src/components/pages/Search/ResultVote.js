function ResultVote(props) {
    return (
        <div>
            <div className="info">
                <h5>{props.title}</h5>
                <p>Organiser: {props.organiser}</p>
                <p>Winner: {props.winner}</p>
                <button>View Vote</button>
            </div>
            <div className="graph">
                Graph
            </div>
        </div>
    )
}
export default ResultVote
