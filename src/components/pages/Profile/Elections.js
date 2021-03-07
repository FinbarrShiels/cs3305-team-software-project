function Elections(props) {
    return (
        <div className="electionsTab">
            <h3> Elections you've organised </h3>
            <div className="electionList">
                {props.currentElections.map(election => {
                return (
                    <div className="electionItem">
                        <hr/>
                        <p>{election.type}</p>
                        <p>{election.data.title}</p>
                        <p>{election.data.description}</p>
                        <p>{election.data.poll_name}</p>
                    </div>
                )
                })}
            </div>
        </div>
    )
}
export default Elections