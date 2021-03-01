import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./TeamMemberCard.css";
function TeamMemberCard(props) {
    return (
        <div className="teamMember">
            <img className="memberAvatar" src={props.avatar} alt=""/>
            <h4 className="memberName">
                {props.name}
            </h4>
            <h5 className="memberRole">
                {props.role}
            </h5>
            <p className="memberStatement">
                {props.statement}
            </p>
            <div className="gitHubLink">
                <a href={props.github} >
                    <FontAwesomeIcon icon={['fab', 'github']} size="2x"/>
                </a>
            </div>
        </div>
    )
}
export default TeamMemberCard