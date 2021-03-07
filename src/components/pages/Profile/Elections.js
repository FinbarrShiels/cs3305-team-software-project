function Elections(props) {
    return (
        <div className="electionsTab">
            <h3> Elections you've organised </h3>
            <div className="electionList">
                {props.currentElections.map(election => {
                return (
                    <div className="electionItem">
                        <hr/>
                        <span className="electionType">{election.type}</span>
                        <span className="electionTitle">{election.data.title}</span>
                        <span className="electionWinner">{election.data.winner}</span>
                        <span className="electionStatus">{election.data.open ? "Open" : "Closed"}</span>
                        {/* Should include start date of the poll */}
                    </div>
                )
                })}
            </div>
        </div>
    )
}
export default Elections