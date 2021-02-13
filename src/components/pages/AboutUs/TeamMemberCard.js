
function TeamMemberCard(props) {
    return (
        <div className="teamMember">
            <div className="memberAvatar">
                {props.avatar}
            </div>
            <h4 className="memberName">
                {props.name}
            </h4>
            <h5 className="memberRole">
                {props.role}
            </h5>
            <p className="memberStatement">
                {props.statement}
            </p>
        </div>
    )
}

export default TeamMemberCard