function OrganiseVote() {
    return (
        <div className="organiseVote">
            <div className="left">
                <h2>Organise your poll</h2>
                
            </div>
            <div className="right">
                <form className="voteOptions">
                    <label>
                        Title:
                        <input type="text"/>
                    </label>
                    <label>
                        Description:
                        <textarea/>
                    </label>
                    <label>
                        Allow Anonymous Voters:
                        <input type="checkbox"/>
                    </label>
                </form>
            </div>
        </div>
    )
}
export default OrganiseVote
