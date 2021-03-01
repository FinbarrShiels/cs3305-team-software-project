import TeamMemberCard from './TeamMemberCard';
import "./AboutUs.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import avatar from "../../Images/avatar.png";
function AboutUs() {
  return(

    <div>
      <div className="memberCards">
        <TeamMemberCard 
          avatar={avatar}
          name={"Luke"}
          role="Team Lead/Front End"
          statement=""
          github="https://github.com/luketynan"
        />
        <TeamMemberCard
          avatar={avatar}
          name="Finbarr"
          role="Front End (CSS)" 
          statement=""
          github="https://github.com/FinbarrShiels"
        />
        <TeamMemberCard
            avatar={avatar}
          name="Jack"
          role="Front End (Design)" 
          statement=""
          github="https://github.com/jackboy-creator"
        />
        <TeamMemberCard
            avatar={avatar}
          name="Diarmuid" 
          role="Backend" 
          statement=""
          github="https://github.com/diarmuidmckenna"
        />
        <TeamMemberCard
            avatar={avatar}
            name={"Con"}
          role="Backend" 
          statement=""
          github="https://github.com/okeeffecon"
        />
      </div>
      <div className="descriptionContainer">
        <div className="description">
          <h2>Description</h2>
          <p>Text</p>
        </div>
        <div className="unique">
          <h2>Unique</h2>
          <p>Text</p>
        </div>
      </div>
      <div className="projectLinks">
          <a href="https://github.com/FinbarrShiels/cs3305-team-software-project">
            <FontAwesomeIcon className="icon" icon={['fab', 'github',]} size="2x"/>
            cs3305-team-software-project
          </a>
      </div>
    </div>
  )
}
export default AboutUs;